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

// On Vercel, we shouldn't exit the process. Instead, we can return an error in the route.
const ai = apiKey && apiKey !== "YOUR_API_KEY" ? new GoogleGenAI({ apiKey }) : null;

async function main(userMessage) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured properly.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      systemInstruction: "You are a DSA instructor. Reply only questions related to Data Structures and Algorithms. If the question is not related to DSA, reply with 'I can only answer questions related to Data Structures and Algorithms.'. Reply in simplest way",
      contents: userMessage,
    });
    
    if (!response || !response.text) {
      throw new Error("Empty response from AI model");
    }
    
    return response.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

// Routes
app.get('/', (req, res) => {
  res.send('DSA Instructor API is running');
});

app.post('/chat', async (req, res) => {
  try {
    if (!apiKey || apiKey === "YOUR_API_KEY") {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set on the server.' });
    }
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

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
