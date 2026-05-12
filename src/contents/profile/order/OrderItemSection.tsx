import { OrderResponse } from "@/service/user/getMyOrder"
import { OrderItemCard } from "./OrderItemCard"

interface Props {
  items: OrderResponse["items"]
}

export function OrderItemsSection({ items }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {items.map((item) => (
        <OrderItemCard
          key={`${item.productId}-${item.batchCode}`}
          item={item}
        />
      ))}
    </div>
  )
}