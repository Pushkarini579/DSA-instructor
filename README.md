# 🎓 DSA Instructor AI

A modern, full-stack chatbot designed to help students master Data Structures and Algorithms. Powered by Google's **Gemini 2.5 Flash**, this AI tutor provides simple, clear explanations and code examples exclusively for DSA topics.

![Modern UI](https://img.shields.io/badge/UI-Modern%20&%20Clean-blue)
![AI Model](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-green)
![React](https://img.shields.io/badge/Frontend-React%2019-blue)
![Express](https://img.shields.io/badge/Backend-Express%205-lightgrey)

## ✨ Features

-   **Specialized Knowledge:** Trained to answer ONLY DSA-related questions.
-   **Markdown Support:** Beautifully rendered code snippets and structured explanations.
-   **Interactive UI:** Clean, modern interface with a responsive sidebar for topic navigation.
-   **Quick Actions:** One-click buttons for "Explain Simply" or "Give me example".
-   **Real-time Interaction:** Fast responses powered by the latest Gemini Flash model.

## 🛠️ Tech Stack

### Frontend
-   **Framework:** React 19 (TypeScript)
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS v4
-   **Icons:** Lucide React
-   **Markdown:** React Markdown & Remark GFM

### Backend
-   **Runtime:** Node.js
-   **Framework:** Express 5
-   **AI Integration:** Google Generative AI SDK (@google/genai)
-   **Model:** `gemini-2.5-flash`

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   A Google Gemini API Key ([Get one here](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/dsa-instructor-ai.git
cd dsa-instructor-ai
```

### 2. Backend Setup
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    PORT=3000
    ```
3.  Start the server:
    ```bash
    npm start
    ```

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 📝 Usage

-   **Ask Anything:** Type your DSA question in the chat box.
-   **Select Topics:** Use the sidebar to quickly jump into specific topics like Linked Lists, Trees, or Graphs.
-   **Simple Mode:** Use the "Explain simply" action if a concept feels too complex.

## 🛡️ Security

-   Ensure your `.env` file is never committed to GitHub.
-   The backend includes basic CORS configuration and input validation.

## 📄 License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.
