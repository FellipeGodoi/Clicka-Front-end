'use client'

import { useState } from "react"
import style from "./style.module.css"

interface Props {
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  statusMap: Record<string, string>
  height?: number
  width?:number
}

export default function OrderStatusFilter({
  selectedStatus,
  setSelectedStatus,
  statusMap,
    height = 34,
    width 
}: Props) {

  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: "relative" }}>
      <button
        className={style.addButton}
        style={{height, width, justifyContent:"center"}}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedStatus === "ALL"
          ? "Todos os status"
          : statusMap[selectedStatus]}
      </button>

      {open && (
        <div
          style={{ border: "1px solid #cacaca" }}
          className="
            absolute
            top-full
            right-0
            z-10
            min-w-[200px]
            rounded-md
            bg-white
            shadow-md
          "
        >
          <div
            style={{ padding: 8 }}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setSelectedStatus("ALL")
              setOpen(false)
            }}
          >
            Todos os status
          </div>

          {Object.entries(statusMap).map(([key, label]) => (
            <div
              key={key}
              style={{ padding: 8 }}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedStatus(key)
                setOpen(false)
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}