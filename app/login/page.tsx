"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import Link from "next/link"

function LoginContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto flex max-w-md items-center justify-center px-4 py-12">
        <Card className="w-full p-8">
          <h1 className="text-2xl font-bold text-foreground">Login</h1>
          <p className="mt-2 text-muted-foreground">Welcome to TutorHub</p>
          <p className="mt-4 text-muted-foreground">Choose your role to continue:</p>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <Link href="/learner/login">
              <Card className="p-6 text-center transition-all hover:shadow-lg hover:border-primary">
                <h2 className="text-xl font-semibold text-foreground">I'm a Learner</h2>
                <p className="mt-2 text-muted-foreground">Find tutors and start learning</p>
              </Card>
            </Link>

            <Link href="/teacher/login">
              <Card className="p-6 text-center transition-all hover:shadow-lg hover:border-primary">
                <h2 className="text-xl font-semibold text-foreground">I'm a Teacher</h2>
                <p className="mt-2 text-muted-foreground">Connect with students and teach</p>
              </Card>
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/learner/signup" className="text-primary hover:underline">
              Sign up as Learner
            </Link>{" "}
            or{" "}
            <Link href="/teacher/signup" className="text-primary hover:underline">
              Sign up as Teacher
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <LoginContent />;
}
