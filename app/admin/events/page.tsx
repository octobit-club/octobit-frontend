"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import { useState } from "react"

export default function AdminEventsPage() {
  const { logout } = useAuth()
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Mock events data - you can connect to real data later
  const events = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and ML.",
      date: "2025-10-15",
      time: "14:00",
      location: "Room 101, Tech Building",
      maxAttendees: 150,
      registeredAttendees: 67,
      status: "upcoming",
      isMainEvent: true
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      description: "Learn modern web development with React, Next.js, and TypeScript.",
      date: "2025-11-20",
      time: "10:00",
      location: "Conference Hall A",
      maxAttendees: 100,
      registeredAttendees: 45,
      status: "upcoming",
      isMainEvent: false
    },
    {
      id: 3,
      title: "Networking Event",
      description: "Connect with industry professionals and fellow students.",
      date: "2025-09-30",
      time: "18:00",
      location: "Student Center",
      maxAttendees: 200,
      registeredAttendees: 89,
      status: "completed",
      isMainEvent: false
    }
  ]

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    isMainEvent: false
  })

  const handleCreateEvent = () => {
    // Here you would normally send the data to your backend
    console.log("Creating event:", newEvent)
    setShowCreateForm(false)
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      isMainEvent: false
    })
  }

  const handleSetMainEvent = (eventId: number) => {
    // Here you would update the main event in your backend
    console.log("Setting main event:", eventId)
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Event Management</h2>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </nav>

          <div className="mt-auto pt-6">
            <Button
              onClick={logout}
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Event Management</h1>
                <p className="text-muted-foreground">Create and manage club events</p>
              </div>
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {showCreateForm ? "Cancel" : "Create Event"}
              </Button>
            </div>

            {/* Create Event Form */}
            {showCreateForm && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-foreground">Create New Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Event Title</label>
                      <Input
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                      <Input
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                        placeholder="Enter event location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                      <Input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Time</label>
                      <Input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Max Attendees</label>
                      <Input
                        type="number"
                        value={newEvent.maxAttendees}
                        onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                        placeholder="Enter maximum attendees"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="mainEvent"
                        checked={newEvent.isMainEvent}
                        onChange={(e) => setNewEvent({...newEvent, isMainEvent: e.target.checked})}
                        className="rounded border-border"
                      />
                      <label htmlFor="mainEvent" className="text-sm font-medium text-foreground">
                        Set as main event (shown on homepage)
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Enter event description"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateEvent} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Create Event
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Events List */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground">All Events</CardTitle>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search events..." className="w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{event.title}</h3>
                            {event.isMainEvent && (
                              <Badge className="bg-primary text-primary-foreground">
                                Main Event
                              </Badge>
                            )}
                            <Badge 
                              variant={event.status === "upcoming" ? "default" : "secondary"}
                              className={event.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.registeredAttendees}/{event.maxAttendees} registered
                            </div>
                            <div>📍 {event.location}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {!event.isMainEvent && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetMainEvent(event.id)}
                              className="text-xs"
                            >
                              Set as Main
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress bar for attendees */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Registration Progress</span>
                          <span>{Math.round((event.registeredAttendees / event.maxAttendees) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(event.registeredAttendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}