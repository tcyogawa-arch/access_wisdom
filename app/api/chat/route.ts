import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY が設定されていません" },
        { status: 500 }
      );
    }

    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(message);
    const text = result.response.text();

    const { error: dbError } = await supabase
      .from("chat_histories")
      .insert({ question: message, answer: text });
    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "不明なエラー";
    return NextResponse.json({ error: `APIエラー: ${message}` }, { status: 500 });
  }
}
