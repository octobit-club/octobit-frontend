"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ArrowRight, AlertCircle, X, MapPin, Clock, Star, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SharedHeader from "@/components/shared-header";
import CountdownTimer from "@/components/countdown-timer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { eventsAPI, announcementsAPI } from "@/lib/api";

// Fallback event data
const fallbackEvent = {
  id: '1',
  title: 'Upcoming Tech Workshop',
  description: 'Join us for an exciting technology workshop. Details will be announced soon.',
  date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  time: '2:00 PM - 5:00 PM',
  location: 'University Campus',
  category: 'Workshop',
  image: '/tech-workshop-coding.jpg',
  currentAttendees: 15,
  maxAttendees: 50,
  highlights: [
    'Hands-on coding experience',
    'Industry expert speakers',
    'Networking opportunities',
    'Free refreshments'
  ]
}

export default function HomePage() {
  // State for API data
  const [nextEvent, setNextEvent] = useState<any>(fallbackEvent)
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Form states
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [importantAnnouncement, setImportantAnnouncement] = useState<any>(null)
  
  const [eventFormData, setEventFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    experience: "",
    tshirtSize: "",
    dietaryRestrictions: "",
    expectations: "",
    studentId: "",
    academicYear: "",
    fieldOfStudy: "",
  })

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load upcoming events
        const eventsResponse = await eventsAPI.getAll({
          active: true,
          upcoming: true,
          limit: 1
        })
        
        if (eventsResponse.success && eventsResponse.data.length > 0) {
          const event = eventsResponse.data[0]
          setNextEvent({
            id: event.id,
            title: event.title,
            description: event.description,
            date: new Date(event.eventDate),
            location: event.location,
            maxAttendees: event.maxAttendees,
            currentAttendees: event.currentAttendees,
            category: event.category,
            difficulty: event.difficulty,
            image: event.imageUrl || "/ai-machine-learning-presentation.jpg",
            highlights: [
              "Professional networking",
              "Hands-on experience", 
              "Expert guidance",
              "Certificate of participation",
              "Refreshments included"
            ]
          })
        } else {
          // Fallback to sample data if no events found
          setNextEvent({
            id: 'sample',
            title: "AI & Machine Learning Workshop",
            description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and ML. Learn from industry experts and work on real projects.",
            date: new Date("2025-10-15T14:00:00"),
            location: "Main Auditorium, University Campus",
            maxAttendees: 150,
            currentAttendees: 67,
            category: "Workshop",
            image: "/ai-machine-learning-presentation.jpg",
            highlights: [
              "Hands-on coding sessions",
              "Industry expert speakers", 
              "Networking opportunities",
              "Certificate of completion",
              "Free refreshments"
            ]
          })
        }

        // Load important announcements
        const announcementsResponse = await announcementsAPI.getAll({
          important: true,
          limit: 1
        })
        
        if (announcementsResponse.success && announcementsResponse.data.length > 0) {
          setImportantAnnouncement(announcementsResponse.data[0])
        }

      } catch (error) {
        console.error('Error loading homepage data:', error)
        // Set fallback data on error
        setNextEvent({
          id: 'fallback',
          title: "AI & Machine Learning Workshop",
          description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and ML.",
          date: new Date("2025-10-15T14:00:00"),
          location: "Main Auditorium, University Campus",
          maxAttendees: 150,
          currentAttendees: 67,
          category: "Workshop",
          image: "/ai-machine-learning-presentation.jpg",
          highlights: [
            "Hands-on coding sessions",
            "Industry expert speakers",
            "Networking opportunities", 
            "Certificate of completion",
            "Free refreshments"
          ]
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEventFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setEventFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // For now, we'll just simulate the registration
      // In a real app, you'd create a user first, then register them for the event
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Event registration:", {
        event: nextEvent?.title,
        formData: eventFormData,
      });
      
      setIsSubmitted(true);
      setShowRegistrationModal(false);
    } catch (error) {
      setError("Failed to register for event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center border-border bg-card">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-foreground">Event Registration Confirmed!</CardTitle>
            <CardDescription className="text-muted-foreground">
              You're all set for {nextEvent.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We've sent you a confirmation email with event details and what to bring. See you there!
            </p>
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
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

      {/* Important Announcement Banner */}
      {importantAnnouncement && showAnnouncement && (
        <div className="bg-primary text-primary-foreground relative z-10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{importantAnnouncement.title}</p>
                  <p className="text-sm opacity-90">{importantAnnouncement.content}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnnouncement(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src="/logo.png" alt="Octobit Logo" width={80} height={80} className="rounded-xl shadow-lg opacity-100 border-0 flex-row items-stretch" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              Next <span className="text-primary">Event</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Don't miss our upcoming event! Register now to secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/join">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join the Club
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  variant="outline"
                  className="border-accent text-foreground hover:bg-accent hover:text-accent-foreground bg-background"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  All Events
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Member Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Countdown Timer - First Thing After Buttons */}
          {nextEvent && (
            <div className="mb-12">
              <CountdownTimer targetDate={nextEvent?.date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} />
            </div>
          )}

          {/* Event Details */}
          {nextEvent && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="space-y-6">
                <div className="border border-border/20 rounded-lg backdrop-blur-sm">
                  <div className="relative">
                    <Image
                      src={nextEvent.image}
                      alt={nextEvent.title}
                      width={600}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      {nextEvent.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-foreground drop-shadow">{nextEvent.title}</h2>
                      <p className="text-muted-foreground text-base mt-2 drop-shadow">
                        {nextEvent.description}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-3 h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground drop-shadow">
                              {nextEvent.date.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="drop-shadow">{nextEvent.date.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-3 h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground drop-shadow">Duration</div>
                            <div className="drop-shadow">{nextEvent.duration || "3 hours"}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-3 h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground drop-shadow">Location</div>
                            <div className="drop-shadow">{nextEvent.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-3 h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground drop-shadow">Attendance</div>
                            <div className="drop-shadow">{nextEvent.currentAttendees}/{nextEvent.maxAttendees} registered</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Highlights */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center drop-shadow">
                          <Star className="mr-2 h-4 w-4 text-primary" />
                          What's Included
                        </h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {nextEvent.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                              <span className="drop-shadow">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <div className="text-center">
                  <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                      >
                        <Calendar className="mr-2 h-6 w-6" />
                        Register for This Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Register for {nextEvent.title}</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        <div className="text-center mb-4">
                          <Badge variant="outline" className="text-sm">
                            {nextEvent.maxAttendees - nextEvent.currentAttendees} spots remaining
                          </Badge>
                        </div>
                        
                        <form className="space-y-6" onSubmit={handleEventSubmit} autoComplete="off">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                              <Input 
                                id="firstName" 
                                value={eventFormData.firstName} 
                                onChange={handleInputChange} 
                                placeholder="Enter your first name" 
                                className="bg-input border-border" 
                                required 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                              <Input 
                                id="lastName" 
                                value={eventFormData.lastName} 
                                onChange={handleInputChange} 
                                placeholder="Enter your last name" 
                                className="bg-input border-border" 
                                required 
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">Email Address</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={eventFormData.email} 
                              onChange={handleInputChange} 
                              placeholder="your.email@example.com" 
                              className="bg-input border-border" 
                              required 
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                              <Input 
                                id="phone" 
                                type="tel" 
                                value={eventFormData.phone} 
                                onChange={handleInputChange} 
                                placeholder="+1 (555) 000-0000" 
                                className="bg-input border-border" 
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="studentId" className="text-foreground">Student ID</Label>
                              <Input 
                                id="studentId" 
                                value={eventFormData.studentId} 
                                onChange={handleInputChange} 
                                placeholder="202331551801" 
                                className="bg-input border-border" 
                                required 
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="academicYear" className="text-foreground">Academic Year</Label>
                              <Select value={eventFormData.academicYear} onValueChange={(value) => handleSelectChange("academicYear", value)}>
                                <SelectTrigger id="academicYear" className="bg-input border-border">
                                  <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1st Year</SelectItem>
                                  <SelectItem value="2">2nd Year</SelectItem>
                                  <SelectItem value="3">3rd Year</SelectItem>
                                  <SelectItem value="4">4th Year</SelectItem>
                                  <SelectItem value="graduate">Graduate</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fieldOfStudy" className="text-foreground">Field of Study</Label>
                              <Input 
                                id="fieldOfStudy" 
                                value={eventFormData.fieldOfStudy} 
                                onChange={handleInputChange} 
                                placeholder="e.g., Computer Science" 
                                className="bg-input border-border" 
                                required 
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dietaryRestrictions" className="text-foreground">Dietary Restrictions (Optional)</Label>
                            <Input 
                              id="dietaryRestrictions" 
                              value={eventFormData.dietaryRestrictions} 
                              onChange={handleInputChange} 
                              placeholder="Any food allergies or preferences" 
                              className="bg-input border-border" 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="expectations" className="text-foreground">What do you hope to learn? (Optional)</Label>
                            <Textarea 
                              id="expectations" 
                              value={eventFormData.expectations} 
                              onChange={handleInputChange} 
                              placeholder="Tell us about your goals for this event..." 
                              className="bg-input border-border min-h-[80px]" 
                            />
                          </div>

                          {error && <div className="text-red-500 text-sm">{error}</div>}
                          <Button 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                            size="lg" 
                            type="submit" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Registering..." : (
                              <>
                                <Calendar className="mr-2 h-5 w-5" />
                                Register for Event
                              </>
                            )}
                          </Button>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}

          {!nextEvent && (
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
                  <p className="text-muted-foreground">
                    Stay tuned for exciting events and workshops!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

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
          <p className="text-sm text-muted-foreground">
            {nextEvent ? (
              <>Next Event: {nextEvent.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</>
            ) : (
              'Stay tuned for upcoming events!'
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}
