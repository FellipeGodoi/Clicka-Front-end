export function SectionTitle({
    title
}: {
    title: string
}) {

    return (
        <h3
            style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "16px",
                color: "var(--dark-blue-100)"
            }}
        >
            {title}
        </h3>
    )
}