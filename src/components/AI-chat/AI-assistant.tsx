"use client";

import { useState } from "react";
import AiChatButton from "./AI-chat-button";
import AiChatModal from "./AI-chat-modal";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AiChatButton
        onClick={() => setOpen(true)}
      />

      <AiChatModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}