# 🎥 AI Video Transcript & Quiz Generator Backend

This is a Python FastAPI backend that:

1. 📥 Accepts a **video URL**, downloads and transcribes it using **Whisper Timestamped**.
2. 🧠 Uses **Gemini AI (Google Generative AI)** to:
   - Answer questions based on transcript.
   - Generate **10 multiple-choice questions (MCQs)** from the transcript.

---

## 📦 Required Packages & Dependencies

Install these with `pip`:

```bash
pip install fastapi uvicorn whisper-timestamped torch requests python-dotenv google-generativeai pydantic
```

If you use a `requirements.txt` file, it should contain:

```
fastapi
uvicorn
whisper-timestamped
torch
requests
python-dotenv
google-generativeai
pydantic
```

---

## 🔑 Google Gemini API Key Setup

To use the Gemini AI API:

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your **Google API key**.
2. Create a `.env` file in the project root and add:

```
GOOGLE_API_KEY=your_api_key_here
```

3. OR directly replace `"YOUR_API_KEY"` in `helper.py`:

```python
API_KEY = "your_api_key_here"
```

---

## 📁 File Structure

```
project/
├── main.py          # FastAPI app
├── helper.py        # All logic for transcription, chat, and quiz generation
├── uploads/         # Folder for downloaded videos
└── .env             # Google API Key (optional)
```

---

## ⚙️ How to Run

```bash
uvicorn main:app --reload
```

By default, the app will run on:  
`http://127.0.0.1:8000`

---

## 📡 API Endpoints

### 1. `POST /upload/`

**Purpose**: Downloads a video from a URL, transcribes it, and stores the transcript.

**Request Body**:

```json
{
  "video_url": "https://example.com/video.mp4"
}
```

**Response**:

```json
{
  "transcript": "00:00:01 --> 00:00:06: Hello and welcome... || ..."
}
```

---

### 2. `POST /chat`

**Purpose**: Chat with Gemini AI about the transcript content.

**Request Body**:

```json
{
  "message": "What did the speaker say about climate change?"
}
```

**Response**:

```json
{
  "response": "The speaker emphasized that..."
}
```

---

### 3. `GET /generate-quiz` *(optional future endpoint)*

In `helper.py`, a function `get_quiz_question(transcript)` is defined that:

- Accepts a transcript
- Returns a JSON array of 10 MCQs based on it

To use this function, you can create a `/generate-quiz` endpoint or call it internally after uploading the transcript.

---

## 🧠 Technologies Used

- [FastAPI](https://fastapi.tiangolo.com/) for building REST APIs
- [Whisper Timestamped](https://github.com/linto-ai/whisper-timestamped) for video transcription
- [Google Generative AI (Gemini)](https://ai.google.dev) for:
  - Answering transcript-related queries
  - Generating MCQs in JSON

---

## 📌 Notes

- Make sure CUDA is installed for GPU support (if available), else Whisper will default to CPU.
- API responses are automatically truncated to fit token limits using `truncate_history()`.

---

## ✅ Example Usage

```bash
curl -X POST http://127.0.0.1:8000/upload/ \
     -H "Content-Type: application/json" \
     -d '{"video_url": "https://example.com/video.mp4"}'

curl -X POST http://127.0.0.1:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Summarize the main topic of the video."}'
```

---

## 📬 Contribute / Report Issues

Feel free to create issues or suggest improvements in this repository.

---



