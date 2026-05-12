import { Button } from "@/components/button/Button"

interface Props {
  orderId: string
  canShowButton: boolean
  cancelOrder? : () => void
}

export function OrderHeader({
  orderId,
  canShowButton,
  cancelOrder = () => null
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        alignItems: "center"
      }}
    >
      <h1 className="text-xl font-semibold">
        Pedido: {orderId}
      </h1>

      {canShowButton && (
        <Button
          maxWidth="200px"
          height="38px"
          ftColor="var(--error-1)"
          borderColor="var(--error-1) dashed"
          onClick={cancelOrder}
        >
          Cancelar pedido
        </Button>
      )}
    </div>
  )
}