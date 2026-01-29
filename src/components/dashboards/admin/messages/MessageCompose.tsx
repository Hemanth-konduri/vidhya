"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";

interface Recipient {
  id: number;
  name: string;
  type: "student" | "teacher" | "admin";
}

interface MessageComposeProps {
  onBack: () => void;
}

export default function MessageCompose({ onBack }: MessageComposeProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [recipientInput, setRecipientInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const availableRecipients: Recipient[] = [
    { id: 1, name: "Dr. Priya Sharma", type: "teacher" },
    { id: 2, name: "Rajesh Kumar", type: "teacher" },
    { id: 3, name: "Sarah Johnson", type: "teacher" },
    { id: 4, name: "Arjun Singh", type: "student" },
    { id: 5, name: "Neha Gupta", type: "student" },
    { id: 6, name: "Vikram Patel", type: "student" },
    { id: 7, name: "System Admin", type: "admin" },
  ];

  const filteredRecipients = availableRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(recipientInput.toLowerCase()) &&
      !recipients.find((rec) => rec.id === r.id)
  );

  const addRecipient = (recipient: Recipient) => {
    setRecipients([...recipients, recipient]);
    setRecipientInput("");
    setShowSuggestions(false);
  };

  const removeRecipient = (id: number) => {
    setRecipients(recipients.filter((r) => r.id !== id));
  };

  const sendMessage = () => {
    if (recipients.length === 0 || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }
    // Handle send logic here
    alert("Message sent successfully!");
    onBack();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-6 border-b border-slate-200">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-xl font-semibold text-slate-900">New Message</h2>
      </div>

      {/* FORM */}
      <div className="p-8 space-y-6">

        {/* RECIPIENTS */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-3">
            Send To
          </label>

          {/* SELECTED RECIPIENTS */}
          {recipients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {recipients.map((recipient) => (
                <div
                  key={recipient.id}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {recipient.name}
                  <button
                    onClick={() => removeRecipient(recipient.id)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* RECIPIENT INPUT */}
          <div className="relative">
            <input
              type="text"
              placeholder="Type name to add recipient..."
              value={recipientInput}
              onChange={(e) => {
                setRecipientInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* SUGGESTIONS */}
            {showSuggestions && filteredRecipients.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                {filteredRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => addRecipient(recipient)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 transition flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{recipient.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{recipient.type}</p>
                    </div>
                    <Plus className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SUBJECT */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter message subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Message
          </label>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
          <p className="text-xs text-slate-500 mt-2">
            {message.length} characters
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Send Message
          </Button>
          <Button onClick={onBack} variant="outline">
            Cancel
          </Button>
        </div>

      </div>

    </div>
  );
}
