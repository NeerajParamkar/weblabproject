import type { StudentInquiry, RevenueData } from "@/lib/types"

// Mock inquiries for the tutor dashboard
export const mockInquiries: StudentInquiry[] = [
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

// Mock revenue data - last 12 months
export const mockMonthlyRevenue: RevenueData[] = [
  { date: "January", amount: 18000, sessions: 20 },
  { date: "February", amount: 22500, sessions: 25 },
  { date: "March", amount: 27000, sessions: 30 },
  { date: "April", amount: 24300, sessions: 27 },
  { date: "May", amount: 31500, sessions: 35 },
  { date: "June", amount: 36000, sessions: 40 },
  { date: "July", amount: 33300, sessions: 37 },
  { date: "August", amount: 39600, sessions: 44 },
  { date: "September", amount: 35100, sessions: 39 },
  { date: "October", amount: 40500, sessions: 45 },
  { date: "November", amount: 45000, sessions: 50 },
  { date: "December", amount: 54000, sessions: 60 },
]

// Mock weekly revenue data for current month (December)
export const mockWeeklyRevenue: RevenueData[] = [
  { date: "Week 1", amount: 9000, sessions: 10 },
  { date: "Week 2", amount: 13500, sessions: 15 },
  { date: "Week 3", amount: 16200, sessions: 18 },
  { date: "Week 4", amount: 15300, sessions: 17 },
]
