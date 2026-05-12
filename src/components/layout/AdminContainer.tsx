'use client'

import { ReactNode } from "react"

interface Props {
  title: string
  children: ReactNode
}

export default function AdminContainer({
  title,
  children
}: Props) {
  return (
    <div
        style={{padding: "32px", gap:"40px"}}
      className="
        w-full
        h-full
        rounded-xl
        border
        border-[var(--neutral-20)]
        p-8
        flex
        flex-col
        gap-10
      "
    >
      <span
        className="
          text-[20px]
          font-semibold
          text-[var(--dark-blue-100)]
        "
      >
        {title}
      </span>

      {children}
    </div>
  )
}