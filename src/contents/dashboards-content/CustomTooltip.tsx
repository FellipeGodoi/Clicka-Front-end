export function CustomTooltip({
    active,
    payload,
    label
}: any) {

    if (!active || !payload?.length) {
        return null
    }

    return (
        <div
            style={{
                background: "#fff",
                border: "1px solid #ddd",
                padding: "12px",
                borderRadius: "8px"
            }}
        >
            <strong>{label}</strong>

            <div style={{ marginTop: "8px" }}>
                {payload.map((item: any) => (
                    <div
                        key={item.name}
                        style={{
                            marginBottom: "8px"
                        }}
                    >
                        <div>
                            {item.name}
                        </div>

                        <div>
                            Qtd vendas: {item.value}
                        </div>

                        {
                            item.value > 0 && (
                                <div>
                                    Valor médio: R$ {
                                        item.payload[
                                            `${item.name}_averagePrice`
                                        ]?.toFixed(2)
                                    }
                                </div>
                            )
                        }


                    </div>
                ))}
            </div>
        </div>
    )
}