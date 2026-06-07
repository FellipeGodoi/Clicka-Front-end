import { SalesDashboardResponse } from "@/service/admin/getSalesDashboard"

export function formatChartData(
    data: SalesDashboardResponse[]
) {
    const products = [
        ...new Set(
            data.map(item => item.productName)
        )
    ]

    const periodsMap = new Map()

    data.forEach(item => {

        if (!periodsMap.has(item.period)) {

            const row: Record<string, any> = {
                period: item.period
            }

            products.forEach(product => {
                row[product] = 0
            })

            periodsMap.set(item.period, row)
        }

        periodsMap.get(item.period)[item.productName] =
            item.quantitySold
    })

    return Array.from(periodsMap.values())
}