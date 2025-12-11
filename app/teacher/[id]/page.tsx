"use client"

import { Navbar } from "@/components/navbar"
import { ContactModal } from "@/components/contact-modal"
import { mockTeachers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, Clock, MessageSquare, Globe, Briefcase } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function TeacherDetailContent({ params }: { params: { id: string } }) {
  const teacher = mockTeachers.find((t) => t.id === params.id)
  const [contactOpen, setContactOpen] = useState(false)

  if (!teacher) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-center text-muted-foreground">Tutor not found</p>
          <div className="mt-6 text-center">
            <Link href="/">
              <Button>Back to Browse</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/" className="mb-6 text-primary hover:underline text-sm">
          ← Back to Tutors
        </Link>

        {/* Header Card */}
        <Card className="mb-8 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <Avatar className="h-32 w-32 flex-shrink-0">
              <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
              <AvatarFallback>
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{teacher.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{teacher.title}</p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span>
                    <span className="font-semibold text-foreground">{teacher.rating}</span>
                    <span className="text-muted-foreground"> ({teacher.reviews} reviews)</span>
                  </span>
                </div>

                <div className="text-2xl font-bold text-primary">${teacher.hourlyRate}/hr</div>
              </div>

              <Button onClick={() => setContactOpen(true)} size="lg" className="mt-6 w-full sm:w-auto">
                Book a Session
              </Button>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="mb-8 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">{teacher.bio}</p>
        </Card>

        {/* Details Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Experience Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Briefcase className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Experience</h3>
                <p className="text-2xl font-bold text-primary">{teacher.experience} years</p>
                <p className="text-sm text-muted-foreground mt-1">Teaching and tutoring students at all levels</p>
              </div>
            </div>
          </Card>

          {/* Response Time Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                <p className="text-2xl font-bold text-primary">{teacher.responseTime}h</p>
                <p className="text-sm text-muted-foreground mt-1">Typical response within this timeframe</p>
              </div>
            </div>
          </Card>

          {/* Subjects Card */}
          <Card className="p-6 md:col-span-2">
            <div className="flex items-start gap-4">
              <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-3">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Languages Card */}
          <Card className="p-6 md:col-span-2">
            <div className="flex items-start gap-4">
              <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Availability Card */}
          <Card className="p-6 md:col-span-2">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Availability</h3>
                <p className="text-foreground">{teacher.availability}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <ContactModal teacher={teacher} open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  )
}

export default function TeacherDetailPage({ params }: { params: { id: string } }) {
  return <TeacherDetailContent params={params} />;
}
