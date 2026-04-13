'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts"
import styles from "./style.module.css"
import { useState } from "react"
import { DateInput } from "@/components/inputs/date-input/DateInput"
import TextInput from "@/components/inputs/text-input/TextInput"
import { Button } from "@/components/button/Button"

interface ChartData {
    month: string
    Notebook: number
    Mouse: number
    Teclado: number
}

const mockChartData: ChartData[] = [
    { month: "Jan", Notebook: 120, Mouse: 80, Teclado: 60 },
    { month: "Fev", Notebook: 150, Mouse: 95, Teclado: 70 },
    { month: "Mar", Notebook: 180, Mouse: 110, Teclado: 90 },
    { month: "Abr", Notebook: 200, Mouse: 130, Teclado: 120 },
    { month: "Mai", Notebook: 170, Mouse: 140, Teclado: 100 },
    { month: "Jun", Notebook: 210, Mouse: 160, Teclado: 130 },
]

const DashboardsContent = () => {
    const [initialDate, setInitialDate] = useState <string> ('')
    const [endDate, setEndDate] = useState <string> ('')
    const [addProd, setAddProd] = useState <string> ('')

    return (
        <div className={styles.container}>
            <span className={styles.title}>Dashboards</span>

            <div style={{display:"flex", gap: 24}}>
                <DateInput id="init" label="Data de inicio" value={initialDate} width="200px" onChange={(e) => setInitialDate(e)}/>
                <DateInput id="init" label="Data final" value={endDate}  width="200px"  onChange={(e) => setEndDate(e)}/>
            </div>

            <div className={styles.card}>
                <div style={{display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                    <span className={styles.subTitle} style={{height:"100%"}}>Venda de produtos  </span>
                    <div style={{display:"flex", justifyContent:"flex-end", gap:12, alignItems:"flex-end", width:"50%"}}>
                    <TextInput maxWidth="400px" id="add-prod" label="Adicionar produto" placeholder="Digite o codigo do produto"/>
                    <Button maxWidth="190px" height="40px" ftColor="white" bgColor="var(--dark-blue-100)"> Buscar </Button>
                    </div>
                </div>
                <div className={styles.chartContainer}>
                    <ResponsiveContainer>
                        <LineChart data={mockChartData}>
                            <CartesianGrid
                                stroke="var(--neutral-20)"
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="month"
                                stroke="var(--neutral-60)"
                            />
                            <YAxis
                                stroke="var(--neutral-60)"
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Notebook"
                                stroke="var(--light-blue-100)"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Mouse"
                                stroke="var(--yellow-100)"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Teclado"
                                stroke="var(--dark-blue-100)"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}

export default DashboardsContent