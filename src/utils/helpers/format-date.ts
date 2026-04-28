export function formatDate(dateString: string) {
  if (!dateString) return ""

  if (dateString.length === 10) {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  const [datePart] = dateString.split("T")
  const [year, month, day] = datePart.split("-")

  return `${day}-${month}-${year}`
}