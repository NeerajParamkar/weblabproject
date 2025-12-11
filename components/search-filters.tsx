"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedSubject: string
  onSubjectChange: (subject: string) => void
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  maxRate: string
  onMaxRateChange: (rate: string) => void
  onReset: () => void
}

const subjects = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "English",
  "Chemistry",
  "Computer Science",
  "History",
  "Spanish",
]
const languages = ["All Languages", "English", "Spanish", "Mandarin", "French"]
const rates = ["Any", "$0-30", "$30-50", "$50-100", "$100+"]

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedLanguage,
  onLanguageChange,
  maxRate,
  onMaxRateChange,
  onReset,
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search tutors by name or specialty..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        {(searchQuery ||
          selectedSubject !== "All Subjects" ||
          selectedLanguage !== "All Languages" ||
          maxRate !== "Any") && (
          <Button variant="outline" size="icon" onClick={onReset} title="Clear filters">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger id="subject">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rate">Hourly Rate</Label>
          <Select value={maxRate} onValueChange={onMaxRateChange}>
            <SelectTrigger id="rate">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {rates.map((rate) => (
                <SelectItem key={rate} value={rate}>
                  {rate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
