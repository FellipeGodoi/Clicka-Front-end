import { api } from "@/api/api"

export type DashboardGroupBy = "DAY" | "MONTH"

export interface SalesDashboardRequest {
    products: string[]
    startDate: string
    endDate: string
    groupBy: DashboardGroupBy
}

export interface SalesDashboardResponse {
    period: string
    productId: string
    productName: string
    quantitySold: number
    averagePrice: number
}

export async function getSalesDashboard(
    params: SalesDashboardRequest
): Promise<SalesDashboardResponse[]> {

    const token = localStorage.getItem("token")

    const response = await api.post<SalesDashboardResponse[]>(
        "/admin/dashboard/sales",
        
        {
            
            products: params.products,
            startDate: params.startDate,
            endDate: params.endDate,
            groupBy: params.groupBy
        }
        ,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
    )
    console.log(response)
    return response.data
}
