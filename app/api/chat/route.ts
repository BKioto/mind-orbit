import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // تغییر مهم: کلید را از محیط امن (Environment Variables) میخواند
    const apiKey = process.env.GEMINI_API_KEY;

    // بررسی وجود کلید
    if (!apiKey) {
      throw new Error("API Key یافت نشد. لطفا تنظیمات سرور (Environment Variables) را چک کنید.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // استفاده از نسخه درخواستی شما: Gemini 3 Pro Preview
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

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