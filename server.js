import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Chatbot Logic
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "YOUR_API_KEY") {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is not set in .env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main(userMessage) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userMessage,
    config: {
      systemInstruction: "You are a DSA instructor. Reply only questions related to Data Structures and Algorithms. If the question is not related to DSA, reply with 'I can only answer questions related to Data Structures and Algorithms.'. Reply in simplest way",
    },
  });
  return response.text;
}

// Routes
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiResponse = await main(message);
    console.log('AI Response:', aiResponse);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
