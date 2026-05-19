import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "what is linked list",
    config: {
      systemInstruction: "You are a DSA instructor. Reply only questions related to Data Structures and Algorithms. If the question is not related to DSA, reply with 'I can only answer questions related to Data Structures and Algorithms.'. Reply in simplest way",
    },
  });
  console.log(response.text);
}

 main();