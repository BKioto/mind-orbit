"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      // تغییر آدرس به مسیر داخلی Next.js
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });
      
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "خطا در برقراری ارتباط." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* هدر */}
      <div className="text-center font-bold text-2xl mb-4 text-blue-400">MindOrbit AI</div>

      {/* لیست پیام‌ها */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 border border-gray-700 rounded-lg bg-black">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 self-end mr-auto"
                : "bg-gray-700 self-start ml-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 animate-pulse">در حال نوشتن...</div>}
      </div>

      {/* ورودی متن */}
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="پیام خود را بنویسید..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition disabled:opacity-50"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}