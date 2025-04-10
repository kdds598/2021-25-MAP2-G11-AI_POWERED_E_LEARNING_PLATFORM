import json
import requests
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import markdown



# Imports from helper.py
from helper import transcribe_video, get_quiz_question, truncate_history, get_gemini_response

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
class TranscriptStorage:
    def __init__(self):
        self.transcript: Optional[str] = None

    def set_transcript(self, new_transcript: str):
        self.transcript = new_transcript

    def get_transcript(self) -> Optional[str]:
        return self.transcript

transcript_storage = TranscriptStorage()

@app.post("/upload/")
async def upload_video(video_url: dict):
    """Downloads a video from a given URL, generates a transcript, and stores it globally."""
    try:
        url = video_url.get("video_url")
        print(url)
        if not url:
            raise HTTPException(status_code=400, detail="Missing 'video_url' in request.")

        file_ext = url.split(".")[-1].lower()
        allowed_extensions = {"mp4", "avi", "mov", "mkv", "flv"}

        if file_ext not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Invalid file type")

        file_path = UPLOAD_DIR / f"downloaded_video.{file_ext}"

        response = requests.get(url, stream=True)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to download video.")

        with file_path.open("wb") as buffer:
            for chunk in response.iter_content(chunk_size=8192):
                buffer.write(chunk)

        print(f"Downloaded video: {file_path}")

        transcript = transcribe_video(str(file_path))
        transcript_storage.set_transcript(transcript)

        return {
            "transcript": transcript
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --------------------------------------------- Chat Functionality ---------------------------------------------

class ChatRequest(BaseModel):
    message: str

MAX_CONTEXT_TOKENS = 8192
conversation_history = []


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """Handles chat requests and fetches relevant transcript dynamically."""
    global conversation_history

    # Retrieve the latest transcript
    transcript = transcript_storage.get_transcript()  # Use the global instance
   
    if not transcript:
        return {"response": "I currently do not have any transcript. Please upload a video first."}
   
    SYSTEM_PROMPT = f"""You are an AI assistant specialized in answering questions about a video's content based on a timestamped transcript: {transcript}. The transcript consists of dialogue with precise time markers, allowing you to provide accurate, well-explained responses.

    **Your Responsibilities:**  

1. **Extract and Explain Information from the Transcript in Detail:**  
   - Use the provided transcript to extract relevant details based on the user's question.  
   - Expand on key points using context from the video rather than providing brief, vague answers.  
   - If the answer spans multiple timestamps, summarize key points concisely.  

2. **Provide Well-Defined and Structured Answers:**  
   - If the transcript provides relevant information, explain it clearly in a short response.  
   - Where applicable, include direct excerpts from the transcript to support your answer.  
   - Ensure responses provide necessary context without excessive detail.  

3. **Reference Timestamps and Quotes for Clarity:**  
   - Mention timestamps when they help the user locate specific details.  
   - If the user asks for exact wording, provide a direct quoted excerpt from the transcript.  
   - Summarize related portions of the transcript when relevant.  

4. **Handle Questions Beyond the Transcript Thoughtfully:**  
   - If the transcript does not contain the requested information, answer using prior knowledge while keeping responses relevant.  
   - If prior knowledge is insufficient, politely inform the user and suggest related insights.  

5. **Provide Simple, Concise String Responses:**  
   - Responses should be short, well-structured, and easy to read (max 4-5 lines).  
   - Avoid unnecessary details while ensuring clarity.  

6. **Ensure Answers Are Short but Well-Defined:**  
   - Every response should be **precise, informative, and to the point** within 4-5 lines.  
   - Keep wording efficient while maintaining clarity and depth.  

**Example Interactions (Encouraging Short, Well-Defined Answers):**  

✅ **User:** What does the speaker say about AI assistants?  
✔️ **Assistant:** The speaker explains that AI assistants help with tasks like scheduling and reminders (0:00:07 - 0:00:15). They contrast assistants with AI agents, stating, "Assistants respond to requests, but agents anticipate needs." This means assistants are reactive, while agents operate autonomously.  

✅ **User:** What is the main topic of the video?  
✔️ **Assistant:** The video discusses AI assistants and agents. It explains how assistants like Siri respond to user commands, while AI models act independently (0:00:30 - 0:00:45). The speaker also covers AI automation in business.  

✅ **User:** Is it easy to use an LLM?  
✔️ **Assistant:** The transcript doesn’t address this, but LLMs are user-friendly in chatbots. However, integrating them into systems may need coding skills. Many platforms simplify this by providing APIs.  

🚫 **User:** What is the speaker’s name?  
⚠️ **Assistant:** The transcript does not mention the speaker’s name.  

🚫 **User:** What happens after the video ends?  
⚠️ **Assistant:** My responses are based on the transcript, so I can't determine events beyond the video's content.  

### **Final Enhancements:**  
✅ Simple, Concise String Responses – No Markdown formatting, just clear, structured text.  
✅ Short Yet Well-Defined Answers – Max 4-5 lines with precise information.  
✅ Stronger Use of Transcript Data – Encourages quoting and summarizing key sections.
"""


    user_message = request.message

    conversation_history = truncate_history(conversation_history, MAX_CONTEXT_TOKENS, SYSTEM_PROMPT)

    try:
        model_response = get_gemini_response(user_message, conversation_history, SYSTEM_PROMPT)

    except HTTPException as e:
        raise e  

    conversation_history.append({"user": user_message, "model": model_response})

    return JSONResponse(content={"response": model_response})




@app.get("/clear_history")
async def clear_history():
    """Clears both conversation history and transcript."""
    global conversation_history
    conversation_history = []
    transcript_storage.set_transcript(None) 
    return {"message": "Conversation history and transcript cleared."}


@app.get("/quiz")
async def generate_quiz():
    """Generates a quiz based on the latest transcript."""
    try : 
        transcript = transcript_storage.get_transcript()
    
        if not transcript:
            return {"response": "I currently do not have any transcript. Please upload a video first."}
        quiz_questions = get_quiz_question(transcript)

        return JSONResponse(content=quiz_questions)
    
    except Exception as e : 

        raise HTTPException(status_code=500, detail=str(e))

