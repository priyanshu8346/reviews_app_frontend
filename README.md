# ReviewAI

An AI-powered platform for collecting, analyzing, and understanding customer feedback. Built with a React frontend, Node.js/Express backend, and Python microservice for AI review analysis using OpenAI.

---

## Features
- **User & Admin Authentication** (OTP via email)
- **Review Submission & Editing**
- **AI-Powered Sentiment, Spam, and Insights**
- **Admin Dashboard with Analytics & Suggestions**
- **Secure JWT-based Auth**
- **Modern UI with Tailwind, MUI, and Radix**

---

## Tech Stack
- **Frontend:** React, Tailwind CSS, MUI, Radix UI, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer
- **AI Service:** Python (Flask), OpenAI API

---

## Project Structure
```
Sentiment_App/
├── ai_review_backend/      # Node.js/Express backend
│   ├── controllers/       # Auth, Review, Admin logic
│   ├── models/            # User, Review schemas
│   ├── routes/            # API routes
│   ├── services/ai_services/ # Python AI microservice
│   ├── config/            # DB connection
│   ├── middleware/        # Auth, Admin checks
│   ├── .env               # Environment variables
│   └── server.js          # Entry point
├── review-ai-frontend/    # React frontend
│   ├── src/               # Components, pages, services
│   ├── public/            # Static files
│   ├── package.json       # Frontend dependencies
│   └── README.md          # This file
```

---

## Setup Instructions

### 1. Backend (Node.js/Express)
- Install dependencies:
  ```sh
  cd ai_review_backend
  npm install
  ```
- Configure `.env` with MongoDB, JWT, email SMTP, etc.
- Start server:
  ```sh
  npm run dev
  # or
  npm start
  ```

### 2. AI Microservice (Python/Flask)
- Install Python dependencies:
  ```sh
  cd ai_review_backend/services/ai_services
  pip install -r requirement.txt
  ```
- Add your OpenAI API key to `.env`:
  ```
  OPENAI_API_KEY=sk-...
  ```
- Start Flask app:
  ```sh
  python app.py
  # Runs on port 8000
  ```

### 3. Frontend (React)
- Install dependencies:
  ```sh
  cd review-ai-frontend
  npm install
  ```
- Start frontend:
  ```sh
  npm start
  # Runs on port 3000
  ```

---

## Usage
- **User:** Login via OTP, submit/edit/delete reviews, see latest review.
- **Admin:** Login via OTP, view analytics, mark spam, get AI-powered suggestions and summaries.
- **AI:** All reviews are analyzed by the Python microservice using OpenAI GPT-4o for sentiment, spam, and insights.

---

## API Endpoints

### Backend (Express)
- `POST /auth/send-otp` — Send OTP to user email
- `POST /auth/verify-otp` — Verify OTP and get JWT
- `POST /reviews/createReview` — Create review (auth required)
- `GET /reviews/my-latest` — Get latest review (auth required)
- `PUT /reviews/:reviewId` — Update review (auth required)
- `DELETE /reviews/:reviewId` — Delete review (auth required)
- `GET /admin/reviews` — Admin analytics (auth+admin required)
- `GET /admin/summary` — AI summary (auth+admin required)
- `GET /admin/suggestions` — AI improvement suggestions (auth+admin required)
- `POST /admin/send-otp` — Send admin OTP
- `POST /admin/verify-otp` — Verify admin OTP

### AI Microservice (Flask)
- `POST /analyze` — Analyze review text, return sentiment, spam, score, problems, goodPoints
- `POST /summary` — Summarize problems/goodPoints
- `POST /suggestions` — Suggest improvements

---

## Environment Variables
- **Backend:** `.env` for MongoDB URI, JWT secret, email SMTP config
- **AI Service:** `.env` for `OPENAI_API_KEY`

---

## License
MIT

---

## Author
Priyanshu Agrawal

