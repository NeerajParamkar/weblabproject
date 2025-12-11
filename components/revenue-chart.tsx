"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import type { RevenueData } from "@/lib/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface RevenueChartProps {
  monthlyData: RevenueData[]
  weeklyData: RevenueData[]
}

export function RevenueChart({ monthlyData, weeklyData }: RevenueChartProps) {
  const [view, setView] = useState<"monthly" | "weekly">("monthly")
  const data = view === "monthly" ? monthlyData : weeklyData

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Revenue Analytics</h3>
          <div className="flex gap-2">
            <Button size="sm" variant={view === "monthly" ? "default" : "outline"} onClick={() => setView("monthly")}>
              Monthly
            </Button>
            <Button size="sm" variant={view === "weekly" ? "default" : "outline"} onClick={() => setView("weekly")}>
              Weekly
            </Button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} labelFormatter={(label) => `${label}`} />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" name="Revenue (₹)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Sessions Chart */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Sessions Completed</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} sessions`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#10b981"
              strokeWidth={2}
              name="Sessions"
              dot={{ fill: "#10b981", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
