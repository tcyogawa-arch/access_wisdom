"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        <h1 className="text-2xl font-bold text-center mb-6">教えて、minta先生</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="border border-gray-300 rounded-lg p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="質問を入力してください..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "回答中..." : "質問する"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {reply && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-500 mb-2">minta先生の回答:</p>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-gray-800 whitespace-pre-wrap">
              {reply}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
