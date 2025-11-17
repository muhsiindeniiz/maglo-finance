'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/components/card'
import { Skeleton } from '@/core/ui/components/skeleton'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/core/ui/components/select'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TooltipItem,
    ChartOptions,
} from 'chart.js'
import { WorkingCapital } from '@/core/api/types'
import { formatCurrency } from '@/packages/util'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface WorkingCapitalChartProps {
    data?: WorkingCapital | undefined  // Explicitly allow undefined
    isLoading?: boolean
}

export default function WorkingCapitalChart({
    data,
    isLoading,
}: WorkingCapitalChartProps) {
    if (isLoading) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
        )
    }

    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        return (
            <Card className="rounded-[10px]">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                        No data available
                    </div>
                </CardContent>
            </Card>
        )
    }

    const chartData = {
        labels: data.data.map((item) => item.month),
        datasets: [
            {
                label: 'Income',
                data: data.data.map((item) => item.income),
                borderColor: '#29A073',
                backgroundColor: 'rgba(41, 160, 115, 0.05)',
                tension: 0.4,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#29A073',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                borderWidth: 3,
            },
            {
                label: 'Expenses',
                data: data.data.map((item) => item.expense),
                borderColor: '#C8EE44',
                backgroundColor: 'rgba(200, 238, 68, 0.05)',
                tension: 0.4,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#C8EE44',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                borderWidth: 3,
            },
        ],
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif',
                        weight: 500,
                    },
                    color: '#1B212D',
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                },
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context: TooltipItem<'line'>) {
                        let label = context.dataset.label || ''
                        if (label) {
                            label += ': '
                        }
                        if (context.parsed.y !== null) {
                            label += formatCurrency(context.parsed.y, data.currency)
                        }
                        return label
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    callback: function (tickValue: string | number) {
                        const numValue = Number(tickValue)
                        if (numValue >= 1000) {
                            return `${(numValue / 1000).toFixed(0)}K`
                        }
                        return numValue.toString()
                    },
                    font: {
                        size: 12,
                    },
                    color: '#64748b',
                    padding: 10,
                },
                border: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#64748b',
                    padding: 10,
                },
                border: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    }

    return (
        <Card className="rounded-[10px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-[#1B212D]">
                    Working Capital
                </CardTitle>
                <Select defaultValue="7days">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="h-[350px]">
                    <Line data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    )
}