"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import Link from "next/link"

function TeacherSignupContent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signup(name, email, password, "tutor")
      router.push("/tutor/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto flex max-w-md items-center justify-center px-4 py-12">
        <Card className="w-full p-8">
          <h1 className="text-2xl font-bold text-foreground">Teacher Sign Up</h1>
          <p className="mt-2 text-muted-foreground">Join TutorHub and start teaching</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/teacher/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Are you a learner?{" "}
            <Link href="/learner/signup" className="text-primary hover:underline">
              Sign up as Learner
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default function TeacherSignupPage() {
  return <TeacherSignupContent />;
}