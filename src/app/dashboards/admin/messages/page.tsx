"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Send, Search, Trash2, Archive } from "lucide-react";
import MessagesList from "@/components/dashboards/admin/messages/MessagesList";
import MessageCompose from "@/components/dashboards/admin/messages/MessageCompose";

type View = "inbox" | "compose";

export default function MessagesPage() {
  const [view, setView] = useState<View>("inbox");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Dashboard / Messages</p>
          <h1 className="text-2xl font-semibold">Messages</h1>
        </div>
        <Button
          onClick={() => setView("compose")}
          className="bg-blue-600 hover:bg-blue-700 gap-2"
        >
          <Send className="w-4 h-4" />
          New Message
        </Button>
      </div>

      {/* CONTENT */}
      {view === "inbox" ? (
        <MessagesList onCompose={() => setView("compose")} />
      ) : (
        <MessageCompose onBack={() => setView("inbox")} />
      )}

    </div>
  );
}
