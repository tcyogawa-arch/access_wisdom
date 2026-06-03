"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sampleText = `対象技術：めっき技術
機能：入力電気量Mに応じて、めっき析出量が得られます。
相談：制御因子や誤差因子について対話したいです。`;

  function handleSample() {
    setInput(sampleText);
  }

  function handleClear() {
    setInput("");
    setReply("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setReply("");
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      let data: { reply?: string; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("サーバーから無効なレスポンスが返されました");
      }

      if (!res.ok) throw new Error(data.error ?? "エラーが発生しました");
      setReply(data.reply ?? "");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-2">品質工学 先人の知を現場の力に</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          品質工学の先人にアクセスします
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="対象技術・機能・困りごとを入力してください..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleSample}
              disabled={loading}
              className="absolute top-2 right-2 text-xs text-gray-400 hover:text-blue-500 disabled:opacity-50 transition"
            >
              サンプル入力
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "対話中..." : "対話を始める"}
            </button>
            {(input || reply || error) && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 border border-gray-300 text-gray-500 rounded-lg py-2 text-sm hover:bg-gray-50 transition"
              >
                クリア
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {reply && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-500 mb-2">対話の足あと:</p>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-gray-800 whitespace-pre-wrap">
              {reply}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
