"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import Link from "next/link"

function SignupContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto flex max-w-md items-center justify-center px-4 py-12">
        <Card className="w-full p-8">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="mt-2 text-muted-foreground">Welcome to TutorHub</p>
          <p className="mt-4 text-muted-foreground">Choose your role to continue:</p>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <Link href="/learner/signup">
              <Card className="p-6 text-center transition-all hover:shadow-lg hover:border-primary">
                <h2 className="text-xl font-semibold text-foreground">I'm a Learner</h2>
                <p className="mt-2 text-muted-foreground">Find tutors and start learning</p>
              </Card>
            </Link>

            <Link href="/teacher/signup">
              <Card className="p-6 text-center transition-all hover:shadow-lg hover:border-primary">
                <h2 className="text-xl font-semibold text-foreground">I'm a Teacher</h2>
                <p className="mt-2 text-muted-foreground">Connect with students and teach</p>
              </Card>
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/learner/login" className="text-primary hover:underline">
              Login as Learner
            </Link>{" "}
            or{" "}
            <Link href="/teacher/login" className="text-primary hover:underline">
              Login as Teacher
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return <SignupContent />;
}
