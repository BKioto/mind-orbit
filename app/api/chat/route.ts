import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // کلید گوگل خودت رو اینجا بذار
    const apiKey = "AIzaSyCO9fA7mhMwUp2kcK8I4vD9d0Pa65AxwhI";
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const body = await req.json();
    const message = body.message;

    const result = await model.generateContent(message + " (پاسخ کوتاه و به فارسی)");
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    return NextResponse.json(
      { reply: "خطا در ارتباط با سرورهای گوگل." },
      { status: 500 }
    );
  }
}