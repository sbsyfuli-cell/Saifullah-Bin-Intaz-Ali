
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getIslamicAnswer = async (question: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `You are an Islamic AI assistant for the app "UBH AL QURAN". 
        Your goal is to provide accurate, respectful, and Sahih (authentic) Islamic information based on the Quran and Sunnah. 
        Answer in Bengali language. If a question is not related to Islam, politely redirect the user. 
        Always provide references where possible. Keep the tone humble and educational.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "দুঃখিত, বর্তমানে সার্ভারে সমস্যা হচ্ছে। অনুগ্রহ করে পরে চেষ্টা করুন।";
  }
};
