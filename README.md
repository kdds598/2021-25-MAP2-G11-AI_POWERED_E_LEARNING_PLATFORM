# AI Powered E-Learning System

## **Project Description**

it is an innovative AI-powered e-learning management system meticulously crafted with the MERN stack (MongoDB, Express.js, React.js, Node.js). It offers a dynamic and engaging learning environment where students can explore interactive courses enriched with video lectures. The platform goes beyond traditional learning by integrating AI to provide intelligent support through a chatbot that answers lecture-related questions and automatically generates quizzes to reinforce learning. Furthermore, it empowers educators to seamlessly upload and manage their course content, including comprehensive video lectures, making high-quality education accessible to all. The system also incorporates robust features for tracking student progress and ensuring a personalized learning journey.

Built with a focus on security and ease of use, it utilizes Google or email authentication via Firebase for a streamlined login process. A well-architected backend efficiently manages user and course data, with MongoDB serving as the reliable database backbone. Cloudinary is integrated for efficient cloud storage and management of all media assets, ensuring a smooth and responsive user experience.

The app includes Google authentication via Firebase, a robust backend for handling users and course data, and MongoDB for storing all user-related and course-related information.

## **Tech Stack**

- **MongoDB**: NoSQL database to store all the required data.
- **Express.js**: Backend framework to handle routing and API requests.
- **React.js**: Frontend library to create dynamic user interfaces.
- **Node.js**: Server environment to run the backend.
- **Firebase Authentication**: Used for secure user authentication.
- **Cloudinary**: Used as a cloud storage solution to manage video, image, and document assets.
- **Vite**: Fast build tool and development server for the frontend.

## **Features**

## 🔐 Non-Fun (Essential) Features

- Authentication (via Firebase)
- Course Uploading (Teachers)
- Video Streaming & Playback
- Secure Media Uploads (Cloudinary)
- User Management (via backend & database)

## 🎉 Fun (AI-Powered Interactive) Features

- AI Chatbot to answer lecture-related questions
- Auto Quiz Generator from lecture transcripts
- AI-based Video Transcription using Whisper
- Live Q&A from Video Content
- Gamified Learning through quizzes
- Dynamic MCQs from Lecture Videos
- Transcript View for Each Lecture

---

## Prerequisites
Ensure the following tools are installed on your machine:
- Node.js (v16 or later)
- npm (Node Package Manager)
- MongoDB Atlas account
- Firebase account
- Cloudinary account

## **Setup Instructions**

Follow these steps to set up the **EduSphere** project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/edusphere.git
cd edusphere
```

### 2. Set Up Firebase
1. Create a Firebase project.
2. Enable authentication by navigating to **Authentication** in the Firebase console.
3. Go to **Project Settings** > **Service Accounts** > **Generate a New Private Key**. Download the JSON file.
4. Get your app's Firebase config by navigating to **Project Settings** > **General**.

### 3. Configure Environment Variables
#### Root `.env` File
Create a `.env` file in the root directory and populate it as follows:
```env
PORT=your_port_number
DBURL=your_mongodb_connection_string
EMAIL=your_email
PASSWORD=generated_app_password
NODE_ENV=production

// Firebase secret key Variables
type=
project_id=
private_key_id=
private_key=
client_email=
client_id=
auth_uri=
token_uri=
auth_provider_x509_cert_url=
client_x509_cert_url=
universe_domain=

// Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### Client `.env` File
Create a `.env` file in the `client` folder and populate it as follows:
```env
VITE_FB_APIKEY=your_firebase_apikey
VITE_FB_AUTHDOMAIN=your_firebase_authdomain
VITE_FB_PROJECTID=your_firebase_projectid
VITE_FB_STORAGEBUCKET=your_firebase_storagebucket
VITE_FB_MESSAGINGSENDERID=your_firebase_messagingsenderid
VITE_FB_APPID=your_firebase_appid
VITE_FB_MEASUREMENTID=your_firebase_measurementid
```
Replace `http://localhost:3000/api` with your actual backend URL during deployment.

### 4. Set Up MongoDB
1. Create a MongoDB cluster using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Copy the connection string and paste it into the `DBURL` variable in the root `.env` file.

### 5. Generate an App Password for Nodemailer
1. Generate an app password for your email account.
2. Update the `EMAIL` and `PASSWORD` fields in the root `.env` file.

### 6. Build and Start the Application
From the root directory, run the following commands:
```bash
npm run build
npm start
```

## Contribution
Feel free to fork this repository and submit pull requests for improvements or bug fixes.

---

Thank you for choosing EduSphere. Happy learning!










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



