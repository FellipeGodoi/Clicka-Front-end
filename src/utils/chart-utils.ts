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

        const row = periodsMap.get(item.period)

        row[item.productName] = item.quantitySold

        row[`${item.productName}_averagePrice`] =
            item.averagePrice
    })

    return Array.from(periodsMap.values())
}


//----------------------------------------------------
export interface ProductSalesSummary {
    productId: string;
    productName: string;
    totalSold: number;
}

export function getSalesSummary(
    data: SalesDashboardResponse[]
): ProductSalesSummary[] {

    const productsMap = new Map<
        string,
        ProductSalesSummary
    >();

    data.forEach(item => {

        if (!productsMap.has(item.productId)) {
            productsMap.set(item.productId, {
                productId: item.productId,
                productName: item.productName,
                totalSold: 0
            });
        }

        const product =
            productsMap.get(item.productId)!;

        product.totalSold += item.quantitySold;
    });

    return Array.from(productsMap.values());
}