"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { User } from "@/lib/types"
import { mockTutors } from "@/lib/mock-tutors"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "student" | "tutor") => Promise<void>
  signup: (name: string, email: string, password: string, role: "student" | "tutor") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, role: "student" | "tutor") => {
    // Mock login - in production, this would call an API
    if (role === "tutor") {
      // For tutors, find mock tutor data (using first tutor - Rohit Sharma)
      const tutorData = mockTutors[0]
      setUser({
        id: tutorData.id,
        email,
        name: tutorData.name,
        role: "tutor",
        isAuthenticated: true,
        tutorProfile: tutorData,
      })
    } else {
      setUser({
        id: "user-1",
        email,
        name: email.split("@")[0],
        role: "student",
        isAuthenticated: true,
      })
    }
  }

  const signup = async (name: string, email: string, password: string, role: "student" | "tutor") => {
    // Mock signup - in production, this would call an API
    if (role === "tutor") {
      const tutorData = mockTutors[0]
      setUser({
        id: tutorData.id,
        email,
        name: tutorData.name,
        role: "tutor",
        isAuthenticated: true,
        tutorProfile: tutorData,
      })
    } else {
      setUser({
        id: "user-" + Date.now(),
        email,
        name,
        role: "student",
        isAuthenticated: true,
      })
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
