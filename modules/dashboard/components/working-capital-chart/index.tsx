'use client'

import { useState, useMemo } from 'react'
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
  Plugin,
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
  data?: WorkingCapital | undefined
  isLoading?: boolean
}

export default function WorkingCapitalChart({ data, isLoading }: WorkingCapitalChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('last7Days')
  const [hiddenDatasets, setHiddenDatasets] = useState<{ [key: string]: boolean }>({})

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
  }

  const toggleDataset = (label: string) => {
    setHiddenDatasets(prev => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const periodOptions = useMemo(
    () => [
      { value: 'last7Days', label: 'Last 7 days' },
      { value: 'last30Days', label: 'Last 30 days' },
      { value: 'last60Days', label: 'Last 60 days' },
      { value: 'last90Days', label: 'Last 90 days' },
      { value: 'allTime', label: 'All Time' },
    ],
    []
  )

  if (isLoading) {
    return (
      <Card className="rounded-[10px] border-[#F5F5F5] shadow-none">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[280px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return (
      <Card className="rounded-[10px] border-[#F5F5F5] shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Working Capital</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[280px] items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const visibleValues: number[] = []
  if (!hiddenDatasets['Income']) {
    visibleValues.push(...data.data.map(item => item.income))
  }
  if (!hiddenDatasets['Expenses']) {
    visibleValues.push(...data.data.map(item => item.expense))
  }

  const maxValue = visibleValues.length > 0 ? Math.max(...visibleValues) : 10000
  const yAxisMax = Math.ceil(maxValue / 1000) * 1000 + 1000

  const chartData = {
    labels: data.data.map(item => item.month),
    datasets: [
      {
        label: 'Income',
        data: data.data.map(item => item.income),
        borderColor: '#29A073',
        backgroundColor: 'rgba(41, 160, 115, 0.05)',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#5243AA',
        pointHoverBorderColor: '#FFFFFF',
        pointHoverBorderWidth: 4,
        borderWidth: 3,
        hidden: hiddenDatasets['Income'],
      },
      {
        label: 'Expenses',
        data: data.data.map(item => item.expense),
        borderColor: '#C8EE44',
        backgroundColor: 'rgba(200, 238, 68, 0.05)',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#5243AA',
        pointHoverBorderColor: '#FFFFFF',
        pointHoverBorderWidth: 4,
        borderWidth: 3,
        hidden: hiddenDatasets['Expenses'],
      },
    ],
  }

  const hoverLinePlugin: Plugin<'line'> = {
    id: 'hoverLine',
    afterDatasetsDraw(chart) {
      const { ctx, tooltip, chartArea } = chart

      if (!tooltip || !chartArea) return

      const activeElements = tooltip.getActiveElements?.()
      if (!activeElements || activeElements.length === 0) return

      const activePoint = activeElements[0]
      if (!activePoint || !activePoint.element) return

      const x = activePoint.element.x

      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
      gradient.addColorStop(0, 'rgba(250, 251, 254, 0)')
      gradient.addColorStop(0.6656, '#F2F6FC')

      ctx.save()

      const rectX = x - 25
      const rectY = chartArea.top
      const rectWidth = 50
      const rectHeight = chartArea.bottom - chartArea.top
      const borderRadius = 12

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(rectX, rectY)
      ctx.lineTo(rectX + rectWidth, rectY)
      ctx.lineTo(rectX + rectWidth, rectY + rectHeight - borderRadius)
      ctx.arcTo(
        rectX + rectWidth,
        rectY + rectHeight,
        rectX + rectWidth - borderRadius,
        rectY + rectHeight,
        borderRadius
      )
      ctx.lineTo(rectX + borderRadius, rectY + rectHeight)
      ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - borderRadius, borderRadius)
      ctx.lineTo(rectX, rectY)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
    },
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        axis: 'xy',
        backgroundColor: '#F3F6F8',
        titleColor: '#1B212D',
        bodyColor: '#1B212D',
        borderColor: 'transparent',
        borderWidth: 0,
        titleFont: {
          size: 12,
          weight: 500,
        },
        bodyFont: {
          size: 12,
          weight: 500,
        },
        padding: {
          top: 6,
          bottom: 7,
          left: 10,
          right: 10,
        },
        displayColors: false,
        yAlign: 'bottom',
        xAlign: 'center',
        caretSize: 6,
        caretPadding: 10,
        callbacks: {
          title: function () {
            return ''
          },
          label: function (context: TooltipItem<'line'>) {
            if (context.parsed.y !== null) {
              return formatCurrency(context.parsed.y, data.currency)
            }
            return ''
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yAxisMax,
        grid: {
          color: 'rgba(0, 0, 0, 0)',
          drawTicks: false,
        },
        ticks: {
          callback: function (tickValue: string | number) {
            const numValue = Number(tickValue)
            return `${(numValue / 1000).toFixed(0)}K`
          },
          font: {
            size: 12,
            weight: 400,
          },
          color: '#929EAE',
          padding: 10,
          stepSize: yAxisMax / 5,
        },
        border: {
          display: false,
        },
      },
      x: {
        offset: true,
        grid: {
          color: '#FFF4FE',
          drawTicks: false,
          lineWidth: 1,
          offset: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 400,
          },
          color: '#929EAE',
          padding: 10,
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'xy',
      intersect: false,
    },
    onHover: (event, activeElements) => {
      const canvasElement = event.native?.target as HTMLCanvasElement
      if (canvasElement) {
        canvasElement.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
      }
    },
  }

  return (
    <Card className="rounded-[10px] border-[#F5F5F5] shadow-none">
      <CardHeader className="flex flex-col space-y-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle className="text-lg font-semibold text-[#1B212D] sm:text-xl">
          Working Capital
        </CardTitle>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => toggleDataset('Income')}
              className="flex cursor-pointer items-center transition-opacity hover:opacity-80"
              style={{ gap: '9px', opacity: hiddenDatasets['Income'] ? 0.4 : 1 }}
            >
              <div className="h-2 w-2 rounded-full bg-[#29A073]" />
              <span className="text-[12px] font-normal text-[#1B212D]">Income</span>
            </button>
            <button
              type="button"
              onClick={() => toggleDataset('Expenses')}
              className="flex cursor-pointer items-center transition-opacity hover:opacity-80"
              style={{ gap: '9px', opacity: hiddenDatasets['Expenses'] ? 0.4 : 1 }}
            >
              <div className="h-2 w-2 rounded-full bg-[#C8EE44]" />
              <span className="text-[12px] font-normal text-[#1B212D]">Expenses</span>
            </button>
          </div>
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="h-auto w-full rounded-[5px] border-none bg-[#F8F8F8] py-[6px] pl-[10px] pr-2 text-[12px] text-[#1B212D] focus:ring-0 focus:ring-offset-0 sm:w-auto">
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] sm:h-[320px]">
          <Line data={chartData} options={options} plugins={[hoverLinePlugin]} />
        </div>
      </CardContent>
    </Card>
  )
}
