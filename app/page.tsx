"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Sparkles, Bot, User, Terminal, Cpu, MessageSquare, Network } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (textInput: string) => {
    if (!textInput.trim()) return;

    const userMessage = { role: "user", content: textInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textInput }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.reply || "خطا در شبکه");

      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "bot", content: error.message || "متاسفانه ارتباط با سرور برقرار نشد." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const suggestions = [
    { title: "ایده پردازی", text: "یک ایده برای استارتاپ هوش مصنوعی بده", icon: <Sparkles className="w-5 h-5 text-yellow-400" /> },
    { title: "برنامه‌نویسی", text: "کد یک ماشین حساب با پایتون رو بنویس", icon: <Terminal className="w-5 h-5 text-blue-400" /> },
    { title: "تولید محتوا", text: "یک متن تبلیغاتی برای فروش کفش بنویس", icon: <MessageSquare className="w-5 h-5 text-green-400" /> },
    { title: "اطلاعات عمومی", text: "تفاوت هوش مصنوعی و یادگیری ماشین چیه؟", icon: <Cpu className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <div dir="rtl" className="flex flex-col h-screen bg-[#0f172a] text-gray-100 font-sans">
      
      {/* هدر سایت */}
      <header className="p-4 border-b border-gray-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shadow-lg">
        
        {/* سمت راست: لوگو و متن */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-blue-500/20 shadow-lg">
             <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide">MindOrbit AI</h1>
            <p className="text-xs text-gray-400">دستیار هوشمند شما</p>
          </div>
        </div>

        {/* سمت چپ: دکمه لینک به همکاران (سئو شده) */}
        <Link 
          href="/partners" 
          title="مشاهده همکاران تجاری و پروژه‌ها"
          aria-label="صفحه همکاران تجاری"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition-all text-xs text-gray-300 hover:text-white"
        >
          <Network className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">همکاران ما</span>
        </Link>

      </header>

      {/* بدنه اصلی */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 fade-in">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 py-2">
                چطور می‌توانم کمکتان کنم؟
              </h2>
              <p className="text-gray-400 text-lg">
                من یک هوش مصنوعی پیشرفته هستم. هر سوالی داری بپرس یا از پیشنهادات زیر استفاده کن.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl px-4">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(item.text)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-blue-500/50 transition-all group text-right"
                >
                  <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-200">{item.title}</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300">{item.text}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`px-5 py-3 rounded-2xl max-w-[85%] leading-7 text-sm md:text-base shadow-md whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 border border-gray-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 justify-start fade-in">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-800 px-5 py-4 rounded-2xl rounded-bl-none border border-gray-700 flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* ورودی پایین صفحه */}
      <div className="p-4 bg-[#0f172a] border-t border-gray-800">
        <div className="max-w-3xl mx-auto relative flex items-end bg-gray-900 rounded-2xl border border-gray-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-xl">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="پیام خود را بنویسید..."
            disabled={loading}
            rows={1}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 rounded-2xl pl-12 pr-4 py-4 focus:outline-none resize-none min-h-[56px] max-h-40 scrollbar-thin scrollbar-thumb-gray-700"
            style={{ height: input ? 'auto' : '56px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="absolute left-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-blue-600 flex items-center justify-center aspect-square h-10 w-10"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-3">
          MindOrbit AI ممکن است اشتباه کند. لطفا اطلاعات حساس را بررسی کنید.
        </p>
      </div>
    </div>
  );
}