'use client'

import { useEffect, useState } from "react"

interface Props {
  message: string
  type?: "success" | "error"
  isOpen: boolean
  onClose: () => void
}

export default function Toast({
  message,
  type = "success",
  isOpen,
  onClose
}: Props) {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setVisible(true)

    const hideTimeout = setTimeout(() => {
      setVisible(false)
    }, 2600)

    const closeTimeout = setTimeout(() => {
      onClose()
    }, 3000)

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(closeTimeout)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999]
        flex items-center
        max-w-[380px]
        rounded-2xl
        shadow-2xl
        text-white
        border
        transition-all duration-500 ease-out
        ${visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
        }
        ${type === "success"
          ? "bg-green-600 border-green-500"
          : "bg-red-600 border-red-500"
        }
      `}
      style={{ padding: "24px" }}
    >
      <p className="text-sm font-medium leading-5">
        {message}
      </p>
    </div>
  )
}