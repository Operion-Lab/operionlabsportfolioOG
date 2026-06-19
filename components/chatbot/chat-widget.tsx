"use client";

import { Bot, Loader2, Send, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask about services, FieldOps SaaS, third-party costs or how to request a quote.",
    },
  ]);

  async function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) {
      return;
    }

    setInput("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: message }]);

    const response = await fetch("/api/chat", {
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const body = await response.json().catch(() => ({}));

    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        content: response.ok
          ? body.reply
          : body.error || "Unable to answer right now. Please use the quote form.",
      },
    ]);
    setLoading(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[min(360px,calc(100vw-2rem))] justify-end">
      {open ? (
        <div className="w-full overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1640a6] bg-[linear-gradient(135deg,#08152f,#0a5bff)] px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bot aria-hidden className="h-5 w-5 text-[var(--brand-green)]" />
              Kriovya Assistant
            </div>
            <button
              aria-label="Close chat"
              className="rounded-md p-1 text-slate-200 hover:bg-white/10"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden size={18} />
            </button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                className={`rounded-lg px-3 py-2 text-sm leading-6 ${
                  message.role === "assistant"
                    ? "bg-[var(--brand-blue-soft)] text-slate-800"
                    : "ml-auto bg-[var(--brand-blue)] text-white"
                }`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                Thinking
              </div>
            ) : null}
          </div>
          <p className="border-t border-slate-200 px-4 py-2 text-xs text-slate-500">
            Informational only. Final quotations are shared after requirement review.
          </p>
          <form className="flex gap-2 border-t border-slate-200 p-3" onSubmit={submitMessage}>
            <input
              className="min-w-0 flex-1 rounded-md border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[#dfe9ff]"
              maxLength={1000}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question"
              value={input}
            />
            <button
              aria-label="Send message"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--brand-blue)] text-white transition hover:bg-[var(--brand-blue-strong)] disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              <Send aria-hidden size={17} />
            </button>
          </form>
        </div>
      ) : (
        <Button className="shadow-lg" onClick={() => setOpen(true)} type="button" variant="secondary">
          <Bot aria-hidden size={18} />
          Chat
        </Button>
      )}
    </div>
  );
}
