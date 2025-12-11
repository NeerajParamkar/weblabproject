"use client"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, GraduationCap, Users, Trophy } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Connect with Expert</span>
              <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Tutors & Learners
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              Join thousands of students and teachers in our community. Learn from experts or share your knowledge.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/learner/signup">Start Learning</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/teacher/signup">Start Teaching</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Why Choose TutorHub?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We make connecting with tutors and students easy and effective
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Expert Tutors</h3>
              <p className="mt-2 text-muted-foreground">
                Connect with experienced tutors in various subjects and skill levels
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Community</h3>
              <p className="mt-2 text-muted-foreground">
                Join a growing community of learners and educators worldwide
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Flexible Learning</h3>
              <p className="mt-2 text-muted-foreground">
                Schedule sessions at your convenience with flexible timings
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Proven Results</h3>
              <p className="mt-2 text-muted-foreground">
                Improve your grades and skills with our proven learning approach
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-purple-600 px-8 py-12 text-center text-white md:px-16">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 text-lg opacity-90">
              Join our platform today and unlock your potential
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/learner/signup">Sign Up as Learner</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20" asChild>
                <Link href="/teacher/signup">Sign Up as Teacher</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}