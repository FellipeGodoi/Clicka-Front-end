interface InfoCardProps {
    title: string
    value: string
}

export function InfoCard({
    title,
    value
}: InfoCardProps) {
    return (
        <div
            style={{
                border: "1px solid var(--neutral-20)",
                borderRadius: "12px",
                padding: "16px"
            }}
        >
            <p
                style={{
                    fontSize: "13px",
                    color: "#666",
                    marginBottom: "8px"
                }}
            >
                {title}
            </p>

            <strong>
                {value}
            </strong>
        </div>
    )
}
