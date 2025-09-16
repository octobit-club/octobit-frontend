"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Users, Star, Plus, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number
  title: string
  description: string
  date: Date
  location: string
  duration: string
  maxAttendees: number
  currentAttendees: number
  category: string
  highlights: string[]
  image: string
  isNextEvent: boolean
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
}

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and ML. Learn from industry experts and work on real projects.",
      date: new Date("2025-10-15T14:00:00"),
      location: "Main Auditorium, University Campus",
      duration: "3 hours",
      maxAttendees: 150,
      currentAttendees: 67,
      category: "Workshop",
      highlights: [
        "Hands-on coding sessions",
        "Industry expert speakers",
        "Networking opportunities",
        "Certificate of completion",
        "Free refreshments"
      ],
      image: "/ai-machine-learning-presentation.jpg",
      isNextEvent: true,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      description: "Learn modern web development with React, Next.js, and TypeScript in this intensive bootcamp.",
      date: new Date("2025-11-20T09:00:00"),
      location: "Tech Lab, Building B",
      duration: "6 hours",
      maxAttendees: 100,
      currentAttendees: 45,
      category: "Bootcamp",
      highlights: [
        "Full-stack development",
        "Modern frameworks",
        "Project-based learning",
        "Industry mentors"
      ],
      image: "/tech-workshop-coding.jpg",
      isNextEvent: false,
      status: "upcoming"
    }
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    duration: "",
    maxAttendees: 100,
    category: "Workshop",
    highlights: [],
    image: "/placeholder.jpg",
    status: "upcoming"
  })

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.location) {
      const event: Event = {
        id: Date.now(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date || new Date(),
        location: newEvent.location,
        duration: newEvent.duration || "2 hours",
        maxAttendees: newEvent.maxAttendees || 100,
        currentAttendees: 0,
        category: newEvent.category || "Workshop",
        highlights: newEvent.highlights || [],
        image: newEvent.image || "/placeholder.jpg",
        isNextEvent: false,
        status: newEvent.status || "upcoming"
      }
      
      setEvents([...events, event])
      setNewEvent({
        title: "",
        description: "",
        date: new Date(),
        location: "",
        duration: "",
        maxAttendees: 100,
        category: "Workshop",
        highlights: [],
        image: "/placeholder.jpg",
        status: "upcoming"
      })
      setShowCreateDialog(false)
    }
  }

  const handleSetNextEvent = (eventId: number) => {
    setEvents(events.map(event => ({
      ...event,
      isNextEvent: event.id === eventId
    })))
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800"
      case "ongoing": return "bg-green-100 text-green-800"
      case "completed": return "bg-gray-100 text-gray-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const nextEvent = events.find(event => event.isNextEvent)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Event Management</h2>
          <p className="text-muted-foreground">Create and manage club events</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({...newEvent, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    placeholder="Event location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    placeholder="e.g., 3 hours"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date & Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newEvent.date?.toISOString().slice(0, 16)}
                    onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent({...newEvent, maxAttendees: parseInt(e.target.value)})}
                    placeholder="100"
                  />
                </div>
              </div>

              <Button onClick={handleCreateEvent} className="w-full">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Next Event Card */}
      {nextEvent && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Star className="h-5 w-5 text-primary" />
                Featured as "Next Event" on Homepage
              </CardTitle>
              <Badge className="bg-primary text-primary-foreground">
                Next Event
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={nextEvent.image}
                  alt={nextEvent.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{nextEvent.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{nextEvent.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {nextEvent.date.toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {nextEvent.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {nextEvent.currentAttendees}/{nextEvent.maxAttendees}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <div className="flex items-center gap-2">
                      {event.isNextEvent && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Next Event
                        </Badge>
                      )}
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.currentAttendees}/{event.maxAttendees} registered
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetNextEvent(event.id)}
                        disabled={event.isNextEvent}
                        className="text-xs"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        {event.isNextEvent ? "Featured" : "Set as Next"}
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {events.length === 0 && (
          <Card className="border-border bg-card">
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">Create your first event to get started</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}