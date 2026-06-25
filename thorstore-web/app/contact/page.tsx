"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "@/lib/api/contact";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactMutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      setName("");
      setEmail("");
      setMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    contactMutation.mutate({ name, email, message });
  };

  return (
    <div className="min-h-screen bg-[var(--blush)]">
      <div className="max-w-lg mx-auto px-6 md:px-10 py-12">
        <h1 className="font-titan text-4xl text-[var(--charcoal)] mb-2">
          Say hi <span className="text-[var(--pink)]">✦</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mb-8">
          Got a question, commission request, or just want to chat? Drop me a
          message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm resize-none"
            />
          </div>

          {contactMutation.isError && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 text-sm font-semibold rounded-xl px-4 py-3">
              Something went wrong. Please try again.
            </div>
          )}

          {contactMutation.isSuccess && (
            <div className="bg-green-50 border-2 border-green-200 text-green-600 text-sm font-semibold rounded-xl px-4 py-3">
              Message sent! I'll get back to you soon ✦
            </div>
          )}

          <button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full bg-[var(--pink)] text-white font-extrabold py-4 rounded-full hover:bg-[#ff3b9a] transition-colors disabled:opacity-50"
          >
            {contactMutation.isPending ? "Sending..." : "Send message ✦"}
          </button>
        </form>
      </div>
    </div>
  );
}
