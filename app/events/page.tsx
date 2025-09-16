import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import SharedHeader from "@/components/shared-header"
import Image from "next/image"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Workshop",
      description: "Learn about the latest technologies and innovation trends in the tech industry.",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Main Auditorium",
      attendees: 120,
      category: "Workshop",
      image: "/tech-workshop-coding.jpg",
    },
    {
      id: 2,
      title: "AI & Machine Learning Seminar",
      description: "Deep dive into artificial intelligence and machine learning applications.",
      date: "February 28, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Computer Lab A",
      attendees: 85,
      category: "Seminar",
      image: "/ai-machine-learning-presentation.jpg",
    },
    {
      id: 3,
      title: "Hackathon 2024",
      description: "24-hour coding competition to solve real-world problems with innovative solutions.",
      date: "January 20-21, 2024",
      time: "6:00 PM - 6:00 PM",
      location: "Innovation Hub",
      attendees: 200,
      category: "Competition",
      image: "/hackathon-coding-competition.jpg",
    },
    {
      id: 4,
      title: "Design Thinking Workshop",
      description: "Learn the fundamentals of design thinking and user experience design.",
      date: "December 10, 2023",
      time: "1:00 PM - 4:00 PM",
      location: "Design Studio",
      attendees: 60,
      category: "Workshop",
      image: "/design-thinking-creative-workshop.jpg",
    },
    {
      id: 5,
      title: "Networking Night",
      description: "Connect with industry professionals and fellow club members.",
      date: "November 25, 2023",
      time: "7:00 PM - 10:00 PM",
      location: "Student Center",
      attendees: 150,
      category: "Social",
      image: "/networking-professional-event.jpg",
    },
    {
      id: 6,
      title: "Robotics Competition",
      description: "Showcase your robotics projects and compete with other teams.",
      date: "October 15, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Building",
      attendees: 90,
      category: "Competition",
      image: "/robotics-competition-engineering.jpg",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Workshop":
        return "bg-primary text-primary-foreground"
      case "Seminar":
        return "bg-accent text-accent-foreground"
      case "Competition":
        return "bg-secondary text-secondary-foreground"
      case "Social":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.png"
          alt="Background Logo"
          width={800}
          height={800}
          className="opacity-[0.1] scale-150 select-none"
        />
      </div>

      <SharedHeader />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our <span className="text-primary">Events</span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover the amazing events we've organized throughout the year. From workshops to competitions, we create
            opportunities for learning and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="border-border bg-card hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-3 right-3 ${getCategoryColor(event.category)}`}>{event.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-foreground text-lg">{event.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {event.attendees} attendees
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="border-border bg-card max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-foreground">Want to Join Our Next Event?</CardTitle>
              <CardDescription className="text-muted-foreground">
                Register as a member to get notified about upcoming events
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border mt-12 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logo.png" alt="Octobit Logo" width={32} height={32} className="rounded-lg" />
            <div>
              <h3 className="font-bold text-foreground">Octobit Scientific Club</h3>
              <p className="text-sm text-muted-foreground">Diving into Innovation</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Registration opens September 22, 2024</p>
        </div>
      </footer>
    </div>
  )
}
