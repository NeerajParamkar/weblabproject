"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, MessageSquare } from "lucide-react"

interface DashboardStatsProps {
  totalRevenue: number
  totalStudents: number
  totalSessions: number
  pendingInquiries: number
}

export function DashboardStats({ totalRevenue, totalStudents, totalSessions, pendingInquiries }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Total Revenue */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
            <p className="mt-2 text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
            <p className="mt-1 text-xs text-green-600">This month</p>
          </div>
          <div className="rounded-lg bg-green-100 p-3">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Active Students */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Students</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{totalStudents}</p>
            <p className="mt-1 text-xs text-blue-600">Total</p>
          </div>
          <div className="rounded-lg bg-blue-100 p-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </Card>

      {/* Total Sessions */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{totalSessions}</p>
            <p className="mt-1 text-xs text-purple-600">This month</p>
          </div>
          <div className="rounded-lg bg-purple-100 p-3">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </Card>

      {/* Pending Inquiries */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Inquiries</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{pendingInquiries}</p>
            <p className="mt-1 text-xs text-orange-600">Awaiting response</p>
          </div>
          <div className="rounded-lg bg-orange-100 p-3">
            <MessageSquare className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </Card>
    </div>
  )
}
