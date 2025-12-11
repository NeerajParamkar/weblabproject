"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { TeacherCard } from "@/components/teacher-card"
import { SearchFilters } from "@/components/search-filters"
import { ContactModal } from "@/components/contact-modal"
import { mockTeachers } from "@/lib/mock-data"
import type { Teacher } from "@/lib/types"

function BrowsePageContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [maxRate, setMaxRate] = useState("Any")
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  const filteredTeachers = mockTeachers.filter((teacher) => {
    const matchesSearch =
      searchQuery === "" ||
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubject = selectedSubject === "All Subjects" || teacher.subjects.includes(selectedSubject)

    const matchesLanguage = selectedLanguage === "All Languages" || teacher.languages.includes(selectedLanguage)

    const matchesRate =
      maxRate === "Any" ||
      (maxRate === "$0-30" && teacher.hourlyRate <= 30) ||
      (maxRate === "$30-50" && teacher.hourlyRate > 30 && teacher.hourlyRate <= 50) ||
      (maxRate === "$50-100" && teacher.hourlyRate > 50 && teacher.hourlyRate <= 100) ||
      (maxRate === "$100+" && teacher.hourlyRate > 100)

    return matchesSearch && matchesSubject && matchesLanguage && matchesRate
  })

  const handleContactClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setContactOpen(true)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedSubject("All Subjects")
    setSelectedLanguage("All Languages")
    setMaxRate("Any")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Find Your Perfect Tutor</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect with expert tutors and accelerate your learning journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 rounded-lg bg-card p-6 shadow-sm border border-border">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            maxRate={maxRate}
            onMaxRateChange={setMaxRate}
            onReset={handleResetFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {filteredTeachers.length === 0
            ? "No tutors match your filters. Try adjusting your search criteria."
            : `Found ${filteredTeachers.length} tutor${filteredTeachers.length !== 1 ? "s" : ""}`}
        </div>

        {/* Teacher Grid */}
        {filteredTeachers.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} onContact={handleContactClick} />
            ))}
          </div>
        )}

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-foreground font-semibold">No results found</p>
          </div>
        )}
      </main>

      <ContactModal teacher={selectedTeacher} open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  )
}

export default function BrowsePage() {
  return <BrowsePageContent />;
}