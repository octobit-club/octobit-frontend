import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Megaphone, Trophy } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function EventsDepartmentPage() {
  const skills = [
    "Event Planning",
    "Project Management",
    "Budget Management",
    "Vendor Relations",
    "Marketing",
    "Logistics",
    "Team Coordination",
    "Risk Management",
  ]

  const eventTypes = [
    {
      title: "Technical Workshops",
      description: "Hands-on learning sessions covering latest technologies and tools",
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
    {
      title: "Networking Events",
      description: "Connect students with industry professionals and alumni",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Competitions",
      description: "Hackathons, coding contests, and innovation challenges",
      icon: <Trophy className="h-8 w-8 text-primary" />,
    },
    {
      title: "Conferences",
      description: "Large-scale events featuring keynote speakers and panels",
      icon: <Megaphone className="h-8 w-8 text-primary" />,
    },
  ]

  const responsibilities = [
    "Plan and coordinate club events from conception to execution",
    "Manage event budgets and negotiate with vendors",
    "Coordinate with other departments for integrated events",
    "Handle event marketing and promotion strategies",
    "Ensure smooth logistics and attendee experience",
    "Evaluate event success and gather feedback for improvement",
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Événementiel <span className="text-primary">Department</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Create memorable experiences. Plan, organize, and execute events that bring our community together and
            inspire learning.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Events Team
            </Button>
          </Link>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Types of Events We Organize</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {eventTypes.map((event, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {event.icon}
                    <CardTitle>{event.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{event.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Your Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">{responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Development */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Skills You'll Develop</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Create Amazing Events?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our events team and bring your organizational skills to life through memorable experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Register Now
              </Button>
            </Link>
            <Link href="/departments">
              <Button variant="outline" size="lg">
                Explore Other Departments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
