export function isStatusAllowed(
  currentStatus: string,
  allowedStatuses: string[]
): boolean {
  return allowedStatuses.includes(currentStatus)
}