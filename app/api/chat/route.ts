import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = "AIzaSyCO9fA7mhMwUp2kcK8I4vD9d0Pa65AxwhI";
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // آپدیت به نسخه ۳ (Gemini 3 Flash Preview)
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const body = await req.json();
    const message = body.message;

    const result = await model.generateContent(message + " (پاسخ کوتاه و به فارسی)");
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("GOOGLE ERROR:", error);
    return NextResponse.json(
      { reply: `خطا: ${error.message}` },
      { status: 500 }
    );
  }
}