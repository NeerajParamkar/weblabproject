export interface Teacher {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  rating: number
  reviews: number
  hourlyRate: number
  subjects: string[]
  experience: number
  languages: string[]
  availability: string
  responseTime: number
}

export interface TutorProfile {
  id: string
  name: string
  avatarUrl: string
  bio: string
  skills: string[]
  locations: string[]
  hourlyRate: number
  languages: string[]
  rating: number
  reviewsCount: number
  contactEmail: string
  availability: string[]
}

export interface User {
  id: string
  email: string
  name: string
  role: "student" | "teacher" | "tutor"
  isAuthenticated: boolean
  tutorProfile?: TutorProfile
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  preferredTime: string
}

export interface StudentInquiry {
  id: string
  studentName: string
  studentEmail: string
  message: string
  preferredTime: string
  date: string
  status: "pending" | "responded" | "booked"
}

export interface RevenueData {
  date: string
  amount: number
  sessions: number
}
