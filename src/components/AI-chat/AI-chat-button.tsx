"use client";

interface AiChatButtonProps {
  onClick: () => void;
}

export default function AiChatButton({
  onClick,
}: AiChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        z-50
        rounded-full
        shadow
      "
      style={{
        width:"50px",
        height:"50px",
        background:"white",
        cursor:"pointer",
        fontSize:35
      }}
    >
      <i className="ri-robot-3-line"></i>
    </button>
  );
}