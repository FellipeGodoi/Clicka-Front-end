'use client'

import { useRouter } from "next/navigation"
import style from "./style.module.css"

interface OrderTableItem {
  id: string
  code: string
  status: string
  total: number
}

interface OrderTableProps {
  items?: OrderTableItem[]
  isEmptyMessage?: string
}

const OrderTable = ({
  items,
  isEmptyMessage = "Nenhum pedido encontrado",
}: OrderTableProps) => {
  const router = useRouter()

  if (!items || items.length === 0) {
    return (
      <p className={style.empty}>
        {isEmptyMessage}
      </p>
    )
  }

  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr className={style.headRow}>
            <th>Código</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={style.row}
              onClick={() => router.push(`/profile/order/${item.id}`)}
            >
              <td className={style.cell}>{item.code}</td>
              <td className={style.cell}>{item.status}</td>
              <td className={style.cell}>
                R$ {item.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable