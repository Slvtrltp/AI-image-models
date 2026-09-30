"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: "How can I help you today?",
  },
];

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = input.trim();
    if (!message || isLoading) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", content: message },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response");
      }

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.message || "I could not generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-5 bottom-5 z-50 sm:right-8 sm:bottom-8">
      {isOpen && (
        <section
          aria-label="Chat assistant"
          className="mb-3 flex h-[430px] w-[calc(100vw-40px)] max-w-[330px] flex-col overflow-hidden rounded-lg border border-[#E4E4E7] bg-white text-[#18181B] shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#E4E4E7] px-4 py-3">
            <h2 className="font-semibold">Chat assistant</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E4E4E7] text-lg hover:bg-[#F4F4F5]"
            >
              ×
            </button>
          </div>

          <div
            className="flex-1 space-y-3 overflow-y-auto p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-[#F4F4F5] text-[#18181B]"
                      : "bg-[#27272A] text-white"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <p className="rounded-xl bg-[#27272A] px-3 py-2 text-sm text-white">
                  Thinking...
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-[#E4E4E7] p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              aria-label="Chat message"
              className="min-w-0 flex-1 rounded-md border border-[#E4E4E7] px-3 py-2 text-sm outline-none focus:border-[#A1A1AA]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#18181B] text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m22 2-7 20-4-9-9-4 20-7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2 11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>
        </section>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          aria-expanded={isOpen}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18181B] text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.25-4.25A9 9 0 1 1 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
