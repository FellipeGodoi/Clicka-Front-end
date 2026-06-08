'use client'

import { useEffect, useState } from 'react'

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts'

import AdminContainer from '@/components/layout/AdminContainer'
import { CustomTooltip } from './CustomTooltip'
import { api } from '@/api/api'

export type DashboardGroupBy =
    | 'DAY'
    | 'MONTH'

type Category =
    | 'HEADSET'
    | 'MOUSE'
    | 'KEYBOARD'

interface CategorySalesResponse {
    period: string
    category: Category
    quantitySold: number
}

const categories = [
    {
        value: 'HEADSET',
        label: 'Fones'
    },
    {
        value: 'MOUSE',
        label: 'Mouses'
    },
    {
        value: 'KEYBOARD',
        label: 'Teclados'
    }
]

export default function DashboardCategoryContent() {

    const DAY_RANGE = 30

    const [startDate, setStartDate] =
        useState('2026-01-01')

    const [endDate, setEndDate] =
        useState('2026-12-01')

    const [groupBy, setGroupBy] =
        useState<DashboardGroupBy>('DAY')

    const [selectedCategories, setSelectedCategories] =
        useState<Category[]>([
            'HEADSET',
            'MOUSE',
            'KEYBOARD'
        ])

    const [chartData, setChartData] =
        useState<any[]>([])

    useEffect(() => {

        if (groupBy !== 'DAY') {
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

        if (groupBy !== 'MONTH') {
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

function formatChartData(
    data: CategorySalesResponse[],
    categories: Category[]
) {

    const grouped: Record<
        string,
        Record<string, any>
    > = {}

    data.forEach(item => {

        if (!grouped[item.period]) {

            grouped[item.period] = {
                period: item.period
            }
        }

        grouped[item.period][item.category] =
            item.quantitySold
    })

    const result = Object.values(grouped)

    result.forEach(item => {

        categories.forEach(category => {

            item[category] ??= 0
        })
    })

    return result
}

    async function handleSearch() {

        try {
            const token = localStorage.getItem("token")

            const response =
                await api.post(
                    '/admin/dashboard/category-sales-report',
                    {
                        categories:
                            selectedCategories,
                        startDate,
                        endDate,
                        groupBy
                    },
                     {
                    headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
                )

            setChartData(
    formatChartData(
        response.data,
        selectedCategories
    )
)

        } catch (error) {

            console.error(error)
        }
    }

    function toggleCategory(
        category: Category
    ) {

        const exists =
            selectedCategories.includes(
                category
            )

        if (exists) {

            setSelectedCategories(
                selectedCategories.filter(
                    c => c !== category
                )
            )

            return
        }

        setSelectedCategories([
            ...selectedCategories,
            category
        ])
    }

const lineKeys = Array.from(
    new Set(
        chartData.flatMap(item =>
            Object.keys(item)
        )
    )
).filter(key => key !== 'period')

    return (
        <AdminContainer title='Dashboard Categorias'>

            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'end',
                    flexWrap: 'wrap',
                    marginBottom: '20px'
                }}
            >

                {
                    groupBy === 'MONTH' && (
                        <>
                            <div className="flex flex-col gap-1">

                                <label>
                                    Data inicial
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1">

                                <label>
                                    Data final
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </>
                    )
                }

                <div className="flex flex-col gap-1">

                    <label>
                        Agrupar por
                    </label>

                    <select
                        value={groupBy}
                        onChange={(e) =>
                            setGroupBy(
                                e.target.value as DashboardGroupBy
                            )
                        }
                    >
                        <option value="DAY">
                            Dia
                        </option>

                        <option value="MONTH">
                            Mês
                        </option>
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                >
                    Buscar
                </button>

            </div>

            <div
    style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    }}
>
    {
        categories.map(category => (

            <label
                key={category.value}
                style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center'
                }}
            >

                <input
                    type="checkbox"
                    checked={
                        selectedCategories.includes(
                            category.value as Category
                        )
                    }
                    onChange={() =>
                        toggleCategory(
                            category.value as Category
                        )
                    }
                />

                {category.label}

            </label>
        ))
    }
</div>

            <div
                style={{
                    height: 500,
                    padding: '0 40px'
                }}
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="period"
                        />

                        <YAxis />

                        <Tooltip
                        />

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

        </AdminContainer>
    )
}