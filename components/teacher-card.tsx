"use client"

import type { Teacher } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

interface TeacherCardProps {
  teacher: Teacher
  onContact: (teacher: Teacher) => void
}

export function TeacherCard({ teacher, onContact }: TeacherCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="flex gap-4 p-6">
        <Avatar className="h-24 w-24 flex-shrink-0">
          <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
          <AvatarFallback>
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 flex-col">
          <Link href={`/teacher/${teacher.id}`} className="hover:text-primary">
            <h3 className="text-lg font-semibold text-foreground">{teacher.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{teacher.title}</p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{teacher.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({teacher.reviews} reviews)</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${teacher.hourlyRate}</p>
            <p className="text-xs text-muted-foreground">per hour</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {teacher.subjects.slice(0, 3).map((subject) => (
            <Badge key={subject} variant="secondary">
              {subject}
            </Badge>
          ))}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Response time: {teacher.responseTime}h</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{teacher.experience} years experience</span>
          </div>
        </div>

        <Button onClick={() => onContact(teacher)} className="w-full">
          Contact Tutor
        </Button>
      </div>
    </Card>
  )
}
