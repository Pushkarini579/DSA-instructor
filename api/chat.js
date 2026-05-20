import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Diagnostic GET route
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "API is online", 
      env_check: process.env.GEMINI_API_KEY ? "Present" : "Missing" 
    });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API Key is missing in Vercel settings." });
    }

    // Initialize AI
    const client = new GoogleGenAI({ apiKey });
    
    // Call the model
    const result = await client.models.generateContent({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a DSA instructor. Reply only questions related to Data Structures and Algorithms. If the question is not related to DSA, reply with 'I can only answer questions related to Data Structures and Algorithms.'. Reply in simplest way",
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    if (!result || !result.text) {
      return res.status(500).json({ error: "AI returned an empty response." });
    }

    return res.status(200).json({ response: result.text });

  } catch (error) {
    console.error("DETAILED_ERROR:", error);
    return res.status(500).json({ 
      error: "API Error", 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
