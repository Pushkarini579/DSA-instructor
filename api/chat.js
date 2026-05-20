import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // 1. Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Wrap everything in a try-catch
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY") {
      return res.status(500).json({ error: "GEMINI_API_KEY is missing in Vercel settings." });
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // 3. Initialize and Call AI in one go
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a DSA instructor. Reply only questions related to Data Structures and Algorithms. If the question is not related to DSA, reply with 'I can only answer questions related to Data Structures and Algorithms.'. Reply in simplest way",
      contents: message, // Simplified string input
    });

    if (!response || !response.text) {
      return res.status(500).json({ error: "AI returned an empty response." });
    }

    return res.status(200).json({ response: response.text });

  } catch (error) {
    console.error("CRASH ERROR:", error);
    return res.status(500).json({ 
      error: "The serverless function crashed.",
      details: error.message 
    });
  }
}
