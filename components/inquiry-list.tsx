"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { StudentInquiry } from "@/lib/types"
import { Mail, Clock } from "lucide-react"

interface InquiryListProps {
  inquiries: StudentInquiry[]
  onUpdateStatus?: (id: string, status: "pending" | "responded" | "booked") => void
}

export function InquiryList({ inquiries, onUpdateStatus }: InquiryListProps) {
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

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-bold text-foreground">Student Inquiries</h3>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="border-b border-border pb-4 last:border-b-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">{inquiry.studentName}</h4>
                  <Badge className={`text-xs ${getStatusColor(inquiry.status)}`}>{inquiry.status}</Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>

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
                    onClick={() => onUpdateStatus && onUpdateStatus(inquiry.id, "responded")}
                  >
                    Respond
                  </Button>
                )}
                {inquiry.status === "responded" && (
                  <Button 
                    size="sm" 
                    onClick={() => onUpdateStatus && onUpdateStatus(inquiry.id, "booked")}
                  >
                    Schedule
                  </Button>
                )}
                {inquiry.status === "booked" && (
                  <Button size="sm" disabled>
                    Scheduled
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
