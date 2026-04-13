"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  disableOutsideClose?: boolean;
}

export default function ModalBody({
  isOpen,
  onClose,
  children,
  maxWidth = "500px",
  maxHeight = "600px",
  disableOutsideClose = false
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (!disableOutsideClose && e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose, disableOutsideClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, 
      }}
      onClick={() => {
        if (!disableOutsideClose) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          maxWidth,
          width: "100%",
          maxHeight,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
