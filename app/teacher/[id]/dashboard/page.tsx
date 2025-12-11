"use client"

import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { mockInquiries } from "@/lib/mock-dashboard-data"

export default function TeacherDashboardPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [inquiries, setInquiries] = useState(mockInquiries)

  useEffect(() => {
    if (!user || user.role !== "tutor") {
      router.push("/teacher/login")
    }
  }, [user, router])

  if (!user || user.role !== "tutor" || !user.tutorProfile) {
    return null
  }

  const profile = user.tutorProfile
  
  const pendingInquiries = inquiries.filter((q) => q.status === "pending").length
  const bookedStudents = inquiries.filter((q) => q.status === "booked").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "responded":
        return "bg-blue-100 text-blue-800"
      case "booked":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = (id: string, newStatus: "pending" | "responded" | "booked") => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Welcome back, {profile.name}!</h1>
              <p className="mt-2 text-muted-foreground">Manage your students and inquiries</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/">Browse Students</Link>
              </Button>
              <Button asChild>
                <Link href="/tutor/profile">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Inquiries</p>
                <p className="text-2xl font-bold text-foreground">{pendingInquiries}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Booked Students</p>
                <p className="text-2xl font-bold text-foreground">{bookedStudents}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                <p className="text-2xl font-bold text-foreground">2h</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold text-foreground">{profile.rating}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Student Inquiries */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Student Inquiries</h2>
              <Button variant="outline">Export Data</Button>
            </div>

            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{inquiry.studentName}</h3>
                        <Badge className={`text-xs ${getStatusColor(inquiry.status)}`}>{inquiry.status}</Badge>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">{inquiry.message}</p>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          {inquiry.studentEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(inquiry.date).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">Preferred time:</span> {inquiry.preferredTime}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {inquiry.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(inquiry.id, "responded")}
                        >
                          Mark Responded
                        </Button>
                      )}
                      {inquiry.status === "responded" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(inquiry.id, "booked")}
                        >
                          Mark Booked
                        </Button>
                      )}
                      {inquiry.status === "booked" && (
                        <Button size="sm" disabled>
                          Confirmed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mb-12">
          <Card className="p-6">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Recent Activity</h2>
            <div className="space-y-4">
              {inquiries.slice(0, 3).map((inquiry) => (
                <div key={inquiry.id} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm text-foreground">
                      New inquiry from <span className="font-semibold">{inquiry.studentName}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(inquiry.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}