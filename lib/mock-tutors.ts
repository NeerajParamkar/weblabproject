import type { TutorProfile } from "@/lib/types"

export const mockTutors: TutorProfile[] = [
  {
    id: "tutor-1",
    name: "Rohit Sharma",
    avatarUrl: "/avatars/rohit.jpg",
    bio: "Experienced maths tutor — JEE/NEET focused. Emphasises conceptual clarity and problem solving speed.",
    skills: ["Mathematics", "Calculus", "Algebra"],
    locations: ["Mumbai"],
    hourlyRate: 900,
    languages: ["English", "Hindi", "Marathi"],
    rating: 4.6,
    reviewsCount: 30,
    contactEmail: "rohit@example.com",
    availability: ["Tue 7–9pm", "Sun 9–11am"],
  },
]
