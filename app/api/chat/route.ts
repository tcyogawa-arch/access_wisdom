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

    const systemPrompt = `あなたは品質工学（タグチメソッド）の思考支援ツールです。
田口玄一博士をはじめとした先人の知に基づき、入力された対象技術・機能・困りごとに対して思考の足あとを提示します。

【出力ルール】
- 正解を断定せず、「候補」「仮説」「現場で確認したい問い」として出力してください
- 以下の見出しをすべて使い、構造化して回答してください
- 各項目は箇条書きで2〜4個の候補・仮説を挙げてください

## 入力信号因子M
（システムを動かす意図的な入力。何をどう変化させているか）

## 出力特性値 y
（理想的に計測したい出力。何を評価軸にするか）

## 制御因子
（設計者が選択・設定できるパラメータの候補）

## 誤差因子
（ばらつきの原因となる外乱・使用条件・個体差の候補）

## 標示因子
（条件を分けて評価すべき用途や環境の候補）

## 品質特性・不具合
（過去事例や文献から想定される不具合・劣化モードの仮説）

## 現場への問いかけ
（実際の現場や設計者に確認すべき問いを3つ以上）

入力内容: `;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(systemPrompt + message);
    const text = result.response.text();

    const { error: dbError } = await supabase
      .from("chat_histories")
      .insert({ question: message, answer: text });
    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const raw = err instanceof Error ? err.message : String(err);
    console.error("API route error:", raw);

    const isOverloaded = /503|high demand|overloaded/i.test(raw);
    const userMessage = isOverloaded
      ? "現在AIが混み合っています。少し時間をおいて、もう一度お試しください。"
      : "AIとの通信中にエラーが発生しました。しばらくしてから再試行してください。";

    return NextResponse.json({ error: userMessage }, { status: 503 });
  }
}
