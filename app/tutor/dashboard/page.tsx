"use client"

import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, MapPin, DollarSign, Mail, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DashboardStats } from "@/components/dashboard-stats"
import { InquiryList } from "@/components/inquiry-list"
import { RevenueChart } from "@/components/revenue-chart"
import { mockMonthlyRevenue, mockWeeklyRevenue } from "@/lib/mock-dashboard-data"
import type { StudentInquiry } from "@/lib/types"

export default function TutorDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [inquiries, setInquiries] = useState<StudentInquiry[]>([])
  const [loading, setLoading] = useState(true)

  const handleUpdateStatus = async (id: string, status: "pending" | "responded" | "booked") => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        const updatedInquiry = await response.json()
        setInquiries(prev => 
          prev.map(inquiry => 
            inquiry.id === id ? { ...inquiry, ...updatedInquiry } : inquiry
          )
        )
      }
    } catch (error) {
      console.error('Failed to update inquiry status:', error)
    }
  }

  useEffect(() => {
    // Wait for auth state to be determined
    if (user === null) {
      // Still loading auth state, don't redirect yet
      return;
    }
    
    if (!user || user.role !== "tutor") {
      router.push("/teacher/login")
    } else {
      // Fetch inquiries from API
      fetch('/api/inquiries')
        .then(res => res.json())
        .then(data => {
          setInquiries(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch inquiries:', err)
          setLoading(false)
        })
    }
  }, [user, router])

  // Show loading state while determining auth status
  if (user === null) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authorized
  if (!user || user.role !== "tutor" || !user.tutorProfile) {
    return null;
  }

  const profile = user.tutorProfile

  const pendingInquiries = inquiries.filter((q) => q.status === "pending").length
  const bookedStudents = inquiries.filter((q) => q.status === "booked").length
  const currentMonthRevenue = mockMonthlyRevenue[11].amount // December
  const currentMonthSessions = mockMonthlyRevenue[11].sessions

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Welcome back, {profile.name}!</h1>
              <p className="mt-2 text-muted-foreground">Monitor your sessions, earnings, and student inquiries</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/browse">View Students</Link>
              </Button>
              <Button asChild>
                <Link href="/tutor/profile">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <DashboardStats
            totalRevenue={currentMonthRevenue}
            totalStudents={bookedStudents}
            totalSessions={currentMonthSessions}
            pendingInquiries={pendingInquiries}
          />
        </div>

        {/* Charts and Inquiries Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Revenue Charts - 2 columns */}
          <div className="lg:col-span-2">
            <RevenueChart monthlyData={mockMonthlyRevenue} weeklyData={mockWeeklyRevenue} />
          </div>

          {/* Inquiry List - 1 column */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Loading inquiries...</p>
              </div>
            ) : (
              <InquiryList 
                inquiries={inquiries} 
                onUpdateStatus={handleUpdateStatus} 
              />
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Your Profile</h2>
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="grid gap-0 md:grid-cols-3">
              {/* Left: Avatar and Stats */}
              <div className="relative flex flex-col items-center gap-6 border-b border-border bg-gradient-to-b from-primary/10 to-background p-8 md:border-b-0 md:border-r">
                <div className="relative">
                  <div className="h-40 w-40 overflow-hidden rounded-2xl border-4 border-primary/20 bg-gradient-to-br from-primary to-primary/50 shadow-lg">
                    <img
                      src={profile.avatarUrl || "/placeholder.svg"}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-foreground">{profile.rating}</span>
                    <span className="text-sm text-muted-foreground">({profile.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="w-full space-y-3 border-t border-border pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profile.skills.length}</div>
                    <div className="text-xs text-muted-foreground">Subjects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profile.languages.length}</div>
                    <div className="text-xs text-muted-foreground">Languages</div>
                  </div>
                </div>
              </div>

              {/* Right: Detailed Info */}
              <div className="col-span-2 space-y-6 p-8">
                {/* Bio */}
                <div className="border-b border-border pb-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    About Me
                  </h3>
                  <p className="mt-3 leading-relaxed text-foreground">{profile.bio}</p>
                </div>

                {/* Two Column Layout */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Hourly Rate */}
                  <div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <h3 className="text-sm font-semibold uppercase text-muted-foreground">Hourly Rate</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-primary">₹{profile.hourlyRate}/hour</p>
                  </div>

                  {/* Locations */}
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-sm font-semibold uppercase text-muted-foreground">Locations</h3>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.locations.map((location) => (
                        <span
                          key={location}
                          className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground">Languages</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.languages.map((lang) => (
                        <span key={lang} className="rounded-lg bg-muted px-3 py-1 text-sm font-medium text-foreground">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground">Specialization</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Email */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground">Contact Email</h3>
                  </div>
                  <p className="mt-2 text-foreground">{profile.contactEmail}</p>
                </div>

                {/* Availability */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground">Availability</h3>
                  </div>
                  <div className="mt-2 space-y-2">
                    {profile.availability.map((slot, idx) => (
                      <p key={idx} className="text-foreground">
                        {slot}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Spacing */}
        <div className="mt-12" />
      </main>
    </div>
  )
}
