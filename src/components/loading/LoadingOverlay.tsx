"use client";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="
      fixed inset-0 
      bg-white/10 backdrop-blur-sm
      flex items-center justify-center
      z-50
    ">
      <div className="
        w-12 h-12 
        border-4 
        border-gray-300 
        border-t-transparent 
        rounded-full 
        animate-spin
      " />
    </div>
  );
}