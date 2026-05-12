import { OrderResponse } from "@/service/user/getMyOrder"

interface Props {
  item: OrderResponse["items"][0]
}

export function OrderItemCard({ item }: Props) {
  return (
    <div
      style={{ padding: "12px 24px" }}
      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold text-zinc-900">
          {item.productName}
        </span>

        <span className="text-sm text-zinc-500">
          Tipo: {item.productType}
        </span>

        <span className="text-sm text-zinc-500">
          Quantidade: {item.quantity}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-sm text-zinc-500">
          Unitário
        </span>

        <span className="text-base font-medium text-zinc-800">
          R$ {item.unitPrice.toFixed(2)}
        </span>

        <span className="mt-2 text-sm text-zinc-500">
          Subtotal
        </span>

        <span className="text-lg font-bold text-zinc-900">
          R$ {item.subtotal.toFixed(2)}
        </span>
      </div>
    </div>
  )
}