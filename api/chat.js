import { GoogleGenAI } from "@google/genai";

// Initialize AI outside the handler for potential warm-start performance
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey && apiKey !== "YOUR_API_KEY" ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(req, res) {
  // Add CORS headers manually for the serverless function
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!genAI) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel. Please add it to Environment Variables.' });
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.models.get("gemini-1.5-flash");
    
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a DSA instructor. Reply only questions related to Data Structures and Algorithms. If the question is not related to DSA, reply with 'I can only answer questions related to Data Structures and Algorithms.'. Reply in simplest way",
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    if (!response || !response.text) {
      throw new Error("Empty response from Gemini API");
    }

    res.status(200).json({ response: response.text });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
