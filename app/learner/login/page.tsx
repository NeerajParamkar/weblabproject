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

function LearnerLoginContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password, "student")
      router.push("/browse")
    } catch (error) {
      console.error("Login failed:", error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto flex max-w-md items-center justify-center px-4 py-12">
        <Card className="w-full p-8">
          <h1 className="text-2xl font-bold text-foreground">Learner Login</h1>
          <p className="mt-2 text-muted-foreground">Welcome back to TutorHub</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/learner/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Are you a teacher?{" "}
            <Link href="/teacher/login" className="text-primary hover:underline">
              Login as Teacher
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default function LearnerLoginPage() {
  return <LearnerLoginContent />;
}