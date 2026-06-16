'use client'

import { useEffect, useState } from 'react'

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'

import { ProductResponse } from '@/service/user/getProducts'
import { DashboardGroupBy, getSalesDashboard, SalesDashboardResponse } from '@/service/admin/getSalesDashboard'
import DashboardSearchInput from '@/components/inputs/dashboard-search-input/DashboardSearchInput'
import AdminContainer from '@/components/layout/AdminContainer'
import { formatChartData, getSalesSummary, ProductSalesSummary } from '@/utils/chart-utils'
import { CustomTooltip } from './CustomTooltip'

export default function DashboardContent() {

    const DAY_RANGE = 30
    const [products, setProducts] = useState<ProductResponse[]>([])
    const [salesSummary, setSalesSummary] = useState<
    ProductSalesSummary[]
>([]);

    const [startDate, setStartDate] = useState('2026-01-01')
    const [endDate, setEndDate] = useState('2026-12-01')

    const [groupBy, setGroupBy] =
        useState<DashboardGroupBy>('DAY')

    const [chartData, setChartData] = useState<any[]>([])

    useEffect(() => {

        if (groupBy !== "DAY") {
            return
        }

        const today = new Date()

        const startDay = new Date()

        startDay.setDate(
            today.getDate() - (DAY_RANGE - 1)
        )

        setStartDate(
            startDay
                .toISOString()
                .split('T')[0]
        )

        setEndDate(
            today
                .toISOString()
                .split('T')[0]
        )

    }, [groupBy])

    useEffect(() => {

        if (groupBy !== "MONTH") {
            return
        }

        const today = new Date()
        setStartDate('2026-01-01')
        setEndDate(
            today
                .toISOString()
                .split('T')[0]
        )

    }, [groupBy])

    async function handleSearch() {
        try {
            const response = await getSalesDashboard({
                products: products.map((p) => p.id),
                startDate,
                endDate,
                groupBy
            })
            const formatted = formatChartData(response)

            setChartData(formatted)
        } catch (error) {
            console.error(error)
        }
    }

    async function addProduct(
        product: ProductResponse
    ) {

        const alreadyExists = products.some(
            p => p.id === product.id
        )

        if (alreadyExists) {
            return
        }

        const updatedProducts = [
            ...products,
            product
        ]

        setProducts(updatedProducts)

        try {

            const response =
                await getSalesDashboard({
                    products: updatedProducts.map(
                        p => p.id
                    ),
                    startDate,
                    endDate,
                    groupBy
                })

            setSalesSummary(
                getSalesSummary(response)
            );

            const formatted =
                formatChartData(response)

            setChartData(formatted)

        } catch (error) {
            console.error(error)
        }
    }


    async function removeProduct(productId: string) {

        const updatedProducts = products.filter(
            product => product.id !== productId
        )

        setProducts(updatedProducts)

        try {

            const response =
                await getSalesDashboard({
                    products: updatedProducts.map(
                        p => p.id
                    ),
                    startDate,
                    endDate,
                    groupBy
                })

            const formatted =
                formatChartData(response)

            setChartData(formatted)

        } catch (error) {
            console.error(error)
        }
    }

const lineKeys =
    chartData.length > 0
        ? Object.keys(chartData[0])
            .filter(
                key =>
                    key !== "period" &&
                    !key.endsWith("_averagePrice")
            )
        : []
    return (
        <AdminContainer title='Dashboard'>
            <DashboardSearchInput
                onSelect={addProduct}
            />
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "end",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                }}
            >
                {
                    groupBy === "MONTH" && (
                        <>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    Data inicial
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={{
                                        padding: "0px 10px"
                                    }}
                                    className="
        h-[35px]

        border
        border-gray-300
        rounded-md
        text-sm
        outline-none
        focus:border-blue-500
        appearance-none
        [&::-webkit-calendar-picker-indicator]:hidden
      "
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    Data final
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    style={{
                                        padding: "0px 10px"
                                    }}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="
        h-[35px]
        border
        border-gray-300
        rounded-md
        text-sm
        outline-none
        focus:border-blue-500
        appearance-none
        [&::-webkit-calendar-picker-indicator]:hidden
      "
                                />
                            </div>
                        </>
                    )
                }


                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        Agrupar por
                    </label>

                    <select
                        value={groupBy}
                        style={{
                            padding: "0px 10px"
                        }}
                        onChange={(e) =>
                            setGroupBy(e.target.value as DashboardGroupBy)
                        }
                        className="
                            h-[35px]
                            border
                            border-gray-300
                            rounded-md
                            text-sm
                            outline-none
                            bg-white
                            focus:border-blue-500
                            appearance-none
                            cursor-pointer
                            "
                    >
                        <option value="DAY">Dia</option>
                        <option value="MONTH">Mês</option>
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                    style={{
                        padding: "5px 20px",
                        cursor: "pointer",
                        borderRadius: "6px",
                        border: "1px solid black"
                    }}
                >
                    Buscar
                </button>
            </div>

            <div style={{ height: 500, padding: "0px 40px" }}>
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="period" />

                        <YAxis />

                        <Tooltip content={<CustomTooltip />} />

                        {
                            lineKeys.map(key => (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    strokeWidth={3}
                                />
                            ))
                        }
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div
                style={{
                    marginTop: "24px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px"
                }}
            >
                <h3
                    style={{
                        marginBottom: "12px"
                    }}
                >
                    Produtos selecionados
                </h3>

                {
                    products.length === 0 && (
                        <p>
                            Nenhum produto selecionado
                        </p>
                    )
                }

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    {
                        products.map(product => (
                            <div
                                key={product.id}
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    border: "1px solid #eee",
                                    borderRadius: "6px"
                                }}
                            >
                                <span>
                                    {product.name}
                                </span>

                                <button
                                    onClick={() =>
                                        removeProduct(
                                            product.id
                                        )
                                    }
                                    style={{
                                        border: "none",
                                        cursor: "pointer",
                                        padding:
                                            "6px 10px",
                                        borderRadius:
                                            "4px"
                                    }}
                                >
                                    <i className="ri-delete-bin-line" style={{ fontSize: "24px" }} />
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div
    style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "24px"
    }}
>

</div>
            </div>
        </AdminContainer>
    )
}