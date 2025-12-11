import { NextResponse } from 'next/server'

// Dummy data for student inquiries
let inquiries = [
  {
    id: "1",
    studentName: "Priya Patel",
    studentEmail: "priya@example.com",
    message: "I need help with JEE maths preparation, especially calculus and algebra.",
    preferredTime: "Weekday evenings after 7pm",
    date: "2024-12-08",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Arjun Singh",
    studentEmail: "arjun@example.com",
    message: "Looking for intensive NEET maths coaching for next 3 months.",
    preferredTime: "Weekends 10am-12pm",
    date: "2024-12-07",
    status: "responded",
  },
  {
    id: "3",
    studentName: "Aisha Verma",
    studentEmail: "aisha@example.com",
    message: "Need help in calculus and problem-solving techniques.",
    preferredTime: "Tuesday and Thursday evenings",
    date: "2024-12-05",
    status: "booked",
  },
  {
    id: "4",
    studentName: "Ravi Kumar",
    studentEmail: "ravi@example.com",
    message: "Starting JEE prep, need foundational concepts covered.",
    preferredTime: "Flexible timing",
    date: "2024-12-03",
    status: "responded",
  },
  {
    id: "5",
    studentName: "Neha Sharma",
    studentEmail: "neha@example.com",
    message: "Weak in algebra, need personalized coaching.",
    preferredTime: "Saturday mornings",
    date: "2024-12-01",
    status: "booked",
  },
]

export async function GET(request: Request) {
  return NextResponse.json(inquiries)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Create a new inquiry
  const newInquiry = {
    id: (inquiries.length + 1).toString(),
    ...body,
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  }
  
  inquiries.push(newInquiry)
  
  return NextResponse.json(newInquiry, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  
  // Update an existing inquiry
  const index = inquiries.findIndex(inquiry => inquiry.id === body.id)
  
  if (index !== -1) {
    inquiries[index] = { ...inquiries[index], ...body }
    return NextResponse.json(inquiries[index])
  }
  
  return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
}