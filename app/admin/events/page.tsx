"use client""use client"



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"import { Badge } from "@/components/ui/badge"

import { Input } from "@/components/ui/input"import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"import { Label } from "@/components/ui/label"

import { Checkbox } from "@/components/ui/checkbox"import { Checkbox } from "@/components/ui/checkbox"

import { Calendar, Users, Plus, Edit, Trash2, Search, ArrowLeft, MapPin, Clock, User2, AlertCircle, CheckCircle2 } from "lucide-react"import { Calendar, Users, Plus, Edit, Trash2, Search, ArrowLeft, MapPin, Clock, User2, AlertCircle, CheckCircle2 } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"import { useAuth } from "@/contexts/auth-context"

import Link from "next/link"import Link from "next/link"

import SharedHeader from "@/components/shared-header"import SharedHeader from "@/components/shared-header"

import { useState } from "react"import { useState } from "react"



// Utility function for consistent date formatting// Utility function for consistent date formatting

const formatDate = (dateString: string) => {const formatDate = (dateString: string) => {

  const date = new Date(dateString)  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {  const options: Intl.DateTimeFormatOptions = {

    year: 'numeric',    year: 'numeric',

    month: '2-digit',    month: '2-digit',

    day: '2-digit'    day: '2-digit'

  }  }

  return date.toLocaleDateString('en-US', options)  return date.toLocaleDateString('en-US', options)

}}



export default function AdminEventsPage() {export default function AdminEventsPage() {

  const { logout } = useAuth()  const { logout } = useAuth()

  const [showCreateForm, setShowCreateForm] = useState(false)  const [showCreateForm, setShowCreateForm] = useState(false)



  // Mock events data - you can connect to real data later  // Mock events data - you can connect to real data later

  const events = [  const events = [

    {    {

      id: 1,      id: 1,

      title: "AI & Machine Learning Workshop",      title: "AI & Machine Learning Workshop",

      description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and ML.",      description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and ML.",

      date: "2025-10-15",      date: "2025-10-15",

      time: "14:00",      time: "14:00",

      location: "Room 101, Tech Building",      location: "Room 101, Tech Building",

      maxAttendees: 150,      maxAttendees: 150,

      registeredAttendees: 67,      registeredAttendees: 67,

      status: "upcoming",      status: "upcoming",

      isMainEvent: true,      isMainEvent: true,

      activationDate: "2025-09-20", // Already active      activationDate: "2025-09-20", // Already active

      isActive: true      isActive: true

    },    },

    {    {

      id: 2,      id: 2,

      title: "Web Development Bootcamp",      title: "Web Development Bootcamp",

      description: "Learn modern web development with React, Next.js, and TypeScript.",      description: "Learn modern web development with React, Next.js, and TypeScript.",

      date: "2025-11-20",      date: "2025-11-20",

      time: "10:00",      time: "10:00",

      location: "Conference Hall A",      location: "Conference Hall A",

      maxAttendees: 100,      maxAttendees: 100,

      registeredAttendees: 45,      registeredAttendees: 45,

      status: "upcoming",      status: "upcoming",

      isMainEvent: false,      isMainEvent: false,

      activationDate: "2025-10-01", // Will be active later      activationDate: "2025-10-01", // Will be active later

      isActive: false      isActive: false

    },    },

    {    {

      id: 3,      id: 3,

      title: "Networking Event",      title: "Networking Event",

      description: "Connect with industry professionals and fellow students.",      description: "Connect with industry professionals and fellow students.",

      date: "2025-09-30",      date: "2025-09-30",

      time: "18:00",      time: "18:00",

      location: "Student Center",      location: "Student Center",

      maxAttendees: 200,      maxAttendees: 200,

      registeredAttendees: 89,      registeredAttendees: 89,

      status: "completed",      status: "completed",

      isMainEvent: false,      isMainEvent: false,

      activationDate: "2025-09-01", // Was active      activationDate: "2025-09-01", // Was active

      isActive: true      isActive: true

    }    }

  ]  ]



  const [newEvent, setNewEvent] = useState({  const [newEvent, setNewEvent] = useState({

    title: "",    title: "",

    description: "",    description: "",

    date: "",    date: "",

    time: "",    time: "",

    location: "",    location: "",

    maxAttendees: "",    maxAttendees: "",

    isMainEvent: false,    isMainEvent: false,

    activationDate: "" // Date when event should show on guest page    activationDate: "" // Date when event should show on guest page

  })  })



  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})

  const [isSubmitting, setIsSubmitting] = useState(false)  const [isSubmitting, setIsSubmitting] = useState(false)



  const validateForm = () => {  const validateForm = () => {

    const errors: {[key: string]: string} = {}    const errors: {[key: string]: string} = {}

        

    if (!newEvent.title.trim()) errors.title = "Event title is required"    if (!newEvent.title.trim()) errors.title = "Event title is required"

    if (!newEvent.description.trim()) errors.description = "Event description is required"    if (!newEvent.description.trim()) errors.description = "Event description is required"

    if (!newEvent.date) errors.date = "Event date is required"    if (!newEvent.date) errors.date = "Event date is required"

    if (!newEvent.time) errors.time = "Event time is required"    if (!newEvent.time) errors.time = "Event time is required"

    if (!newEvent.location.trim()) errors.location = "Event location is required"    if (!newEvent.location.trim()) errors.location = "Event location is required"

    if (!newEvent.maxAttendees || parseInt(newEvent.maxAttendees) <= 0) {    if (!newEvent.maxAttendees || parseInt(newEvent.maxAttendees) <= 0) {

      errors.maxAttendees = "Maximum attendees must be a positive number"      errors.maxAttendees = "Maximum attendees must be a positive number"

    }    }

    if (!newEvent.activationDate) errors.activationDate = "Activation date is required"    if (!newEvent.activationDate) errors.activationDate = "Activation date is required"

        

    // Check if activation date is not in the past    // Check if activation date is not in the past

    const today = new Date().toISOString().split('T')[0]    const today = new Date().toISOString().split('T')[0]

    if (newEvent.activationDate && newEvent.activationDate < today) {    if (newEvent.activationDate && newEvent.activationDate < today) {

      errors.activationDate = "Activation date cannot be in the past"      errors.activationDate = "Activation date cannot be in the past"

    }    }

        

    // Check if event date is after activation date    // Check if event date is after activation date

    if (newEvent.date && newEvent.activationDate && newEvent.date <= newEvent.activationDate) {    if (newEvent.date && newEvent.activationDate && newEvent.date <= newEvent.activationDate) {

      errors.date = "Event date should be after the activation date"      errors.date = "Event date should be after the activation date"

    }    }



    setFormErrors(errors)    setFormErrors(errors)

    return Object.keys(errors).length === 0    return Object.keys(errors).length === 0

  }  }



  const handleCreateEvent = async () => {  const handleCreateEvent = async () => {

    if (!validateForm()) return    if (!validateForm()) return



    setIsSubmitting(true)    setIsSubmitting(true)

        

    try {    try {

      // Here you would normally send the data to your backend      // Here you would normally send the data to your backend

      console.log("Creating event:", newEvent)      console.log("Creating event:", newEvent)

            

      // Simulate API call      // Simulate API call

      await new Promise(resolve => setTimeout(resolve, 1000))      await new Promise(resolve => setTimeout(resolve, 1000))

            

      setShowCreateForm(false)      setShowCreateForm(false)

      resetForm()      resetForm()

            

      // Show success message (you might want to use a proper toast notification)      // Show success message (you might want to use a proper toast notification)

      alert("Event created successfully!")      alert("Event created successfully!")

    } catch (error) {    } catch (error) {

      console.error("Error creating event:", error)      console.error("Error creating event:", error)

      alert("Failed to create event. Please try again.")      alert("Failed to create event. Please try again.")

    } finally {    } finally {

      setIsSubmitting(false)      setIsSubmitting(false)

    }    }

  }  }



  const resetForm = () => {  const resetForm = () => {

    setNewEvent({    setNewEvent({

      title: "",      title: "",

      description: "",      description: "",

      date: "",      date: "",

      time: "",      time: "",

      location: "",      location: "",

      maxAttendees: "",      maxAttendees: "",

      isMainEvent: false,      isMainEvent: false,

      activationDate: ""      activationDate: ""

    })    })

    setFormErrors({})    setFormErrors({})

  }  }



  const handleSetMainEvent = (eventId: number) => {  const handleSetMainEvent = (eventId: number) => {

    // Here you would update the main event in your backend    // Here you would update the main event in your backend

    console.log("Setting main event:", eventId)    console.log("Setting main event:", eventId)

  }  }



  const handleToggleEventActivation = (eventId: number) => {  const handleToggleEventActivation = (eventId: number) => {

    // Here you would toggle the event activation in your backend    // Here you would toggle the event activation in your backend

    console.log("Toggling event activation:", eventId)    console.log("Toggling event activation:", eventId)

    alert("Event activation toggle would be implemented here")    alert("Event activation toggle would be implemented here")

  }  }



  return (  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">

      <SharedHeader />      <SharedHeader />

            

      <div className="flex">      <div className="flex">

        {/* Sidebar */}        {/* Sidebar */}

        <div className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 min-h-screen p-6 shadow-lg">        <div className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 min-h-screen p-6 shadow-lg">

          <div className="flex items-center gap-3 mb-8">          <div className="flex items-center gap-3 mb-8">

            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">

              <Calendar className="h-6 w-6 text-white" />              <Calendar className="h-6 w-6 text-white" />

            </div>            </div>

            <div>            <div>

              <h2 className="font-bold text-gray-900 dark:text-white text-lg">Event Management</h2>              <h2 className="font-bold text-gray-900 dark:text-white text-lg">Event Management</h2>

              <p className="text-sm text-gray-600 dark:text-gray-400">Admin Panel</p>              <p className="text-sm text-gray-600 dark:text-gray-400">Admin Panel</p>

            </div>            </div>

          </div>          </div>



          <nav className="space-y-2">          <nav className="space-y-2">

            <Link href="/admin">            <Link href="/admin">

              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">

                <ArrowLeft className="h-4 w-4 mr-2" />                <ArrowLeft className="h-4 w-4 mr-2" />

                Back to Admin                Back to Admin

              </Button>              </Button>

            </Link>            </Link>

          </nav>          </nav>



          <div className="mt-auto pt-6">          <div className="mt-auto pt-6">

            <Button            <Button

              onClick={logout}              onClick={logout}

              variant="outline"              variant="outline"

              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"

            >            >

              Logout              Logout

            </Button>            </Button>

          </div>          </div>

        </div>        </div>



        {/* Main Content */}        {/* Main Content */}

        <main className="flex-1 p-8">        <main className="flex-1 p-8 bg-transparent">

          <div className="max-w-7xl mx-auto space-y-8">          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}            {/* Header */}

            <div className="space-y-8">            <div className="space-y-8">

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                <div className="space-y-3">                <div className="space-y-3">

                  <div className="flex items-center gap-3">                  <div className="flex items-center gap-3">

                    <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>                    <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Event Management System</h1>                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Event Management System</h1>

                  </div>                  </div>

                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">

                    Comprehensive event lifecycle management with advanced analytics and automated workflows                    Comprehensive event lifecycle management with advanced analytics and automated workflows

                  </p>                  </p>

                </div>                </div>

                <div className="flex gap-3">                <div className="flex gap-3">

                  <Button                  <Button

                    variant="outline"                    variant="outline"

                    className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"                    className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"

                  >                  >

                    <Search className="h-4 w-4 mr-2" />                    <Search className="h-4 w-4 mr-2" />

                    Advanced Search                    Advanced Search

                  </Button>                  </Button>

                  <Button                  <Button

                    onClick={() => setShowCreateForm(!showCreateForm)}                    onClick={() => setShowCreateForm(!showCreateForm)}

                    className={`${showCreateForm                     className={`${showCreateForm 

                      ? 'bg-gray-600 hover:bg-gray-700 text-white'                       ? 'bg-gray-600 hover:bg-gray-700 text-white' 

                      : 'bg-blue-600 hover:bg-blue-700 text-white'                      : 'bg-blue-600 hover:bg-blue-700 text-white'

                    } px-6 py-2.5 font-medium`}                    } px-6 py-2.5 font-medium`}

                  >                  >

                    <Plus className="h-4 w-4 mr-2" />                    <Plus className="h-4 w-4 mr-2" />

                    {showCreateForm ? "Cancel Creation" : "New Event"}                    {showCreateForm ? "Cancel Creation" : "New Event"}

                  </Button>                  </Button>

                </div>                </div>

              </div>              </div>

                            

              {/* Statistics Dashboard */}              {/* Statistics Dashboard */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">

                  <CardContent className="p-6">                  <CardContent className="p-6">

                    <div className="flex items-center justify-between">                    <div className="flex items-center justify-between">

                      <div>                      <div>

                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Events</p>                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Events</p>

                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{events.length}</p>                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{events.length}</p>

                      </div>                      </div>

                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">

                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />

                      </div>                      </div>

                    </div>                    </div>

                    <div className="mt-4 flex items-center text-sm">                    <div className="mt-4 flex items-center text-sm">

                      <span className="text-green-600 dark:text-green-400 font-medium">+2 this month</span>                      <span className="text-green-600 dark:text-green-400 font-medium">+2 this month</span>

                    </div>                    </div>

                  </CardContent>                  </CardContent>

                </Card>                </Card>

                                

                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">

                  <CardContent className="p-6">                  <CardContent className="p-6">

                    <div className="flex items-center justify-between">                    <div className="flex items-center justify-between">

                      <div>                      <div>

                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Events</p>                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Events</p>

                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{events.filter(e => e.status === 'upcoming').length}</p>                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{events.filter(e => e.status === 'upcoming').length}</p>

                      </div>                      </div>

                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">

                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />

                      </div>                      </div>

                    </div>                    </div>

                    <div className="mt-4 flex items-center text-sm">                    <div className="mt-4 flex items-center text-sm">

                      <span className="text-blue-600 dark:text-blue-400 font-medium">{events.filter(e => e.isActive).length} live on site</span>                      <span className="text-blue-600 dark:text-blue-400 font-medium">{events.filter(e => e.isActive).length} live on site</span>

                    </div>                    </div>

                  </CardContent>                  </CardContent>

                </Card>                </Card>

                                

                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">

                  <CardContent className="p-6">                  <CardContent className="p-6">

                    <div className="flex items-center justify-between">                    <div className="flex items-center justify-between">

                      <div>                      <div>

                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Registrations</p>                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Registrations</p>

                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{events.reduce((sum, e) => sum + e.registeredAttendees, 0)}</p>                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{events.reduce((sum, e) => sum + e.registeredAttendees, 0)}</p>

                      </div>                      </div>

                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">

                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />

                      </div>                      </div>

                    </div>                    </div>

                    <div className="mt-4 flex items-center text-sm">                    <div className="mt-4 flex items-center text-sm">

                      <span className="text-gray-600 dark:text-gray-400">Avg: {Math.round(events.reduce((sum, e) => sum + e.registeredAttendees, 0) / events.length)} per event</span>                      <span className="text-gray-600 dark:text-gray-400">Avg: {Math.round(events.reduce((sum, e) => sum + e.registeredAttendees, 0) / events.length)} per event</span>

                    </div>                    </div>

                  </CardContent>                  </CardContent>

                </Card>                </Card>

                                

                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">                <Card className="border-0 bg-white dark:bg-gray-800 shadow-sm">

                  <CardContent className="p-6">                  <CardContent className="p-6">

                    <div className="flex items-center justify-between">                    <div className="flex items-center justify-between">

                      <div>                      <div>

                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Capacity Utilization</p>                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Capacity Utilization</p>

                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round((events.reduce((sum, e) => sum + e.registeredAttendees, 0) / events.reduce((sum, e) => sum + e.maxAttendees, 0)) * 100)}%</p>                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round((events.reduce((sum, e) => sum + e.registeredAttendees, 0) / events.reduce((sum, e) => sum + e.maxAttendees, 0)) * 100)}%</p>

                      </div>                      </div>

                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">

                        <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />                        <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />

                      </div>                      </div>

                    </div>                    </div>

                    <div className="mt-4">                    <div className="mt-4">

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">

                        <div                         <div 

                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"                           className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" 

                          style={{ width: `${Math.round((events.reduce((sum, e) => sum + e.registeredAttendees, 0) / events.reduce((sum, e) => sum + e.maxAttendees, 0)) * 100)}%` }}                          style={{ width: `${Math.round((events.reduce((sum, e) => sum + e.registeredAttendees, 0) / events.reduce((sum, e) => sum + e.maxAttendees, 0)) * 100)}%` }}

                        ></div>                        ></div>

                      </div>                      </div>

                    </div>                    </div>

                  </CardContent>                  </CardContent>

                </Card>                </Card>

              </div>              </div>

            </div>            </div>



            {/* Create Event Form */}            {/* Create Event Form */}

            {showCreateForm && (            {showCreateForm && (

              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">

                <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">                <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">

                  <div className="flex items-center justify-between">                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">                    <div className="flex items-center gap-4">

                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">

                        <Plus className="h-5 w-5 text-white" />                        <Plus className="h-5 w-5 text-white" />

                      </div>                      </div>

                      <div>                      <div>

                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Create New Event</CardTitle>                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Create New Event</CardTitle>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure event details and settings</p>                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure event details and settings</p>

                      </div>                      </div>

                    </div>                    </div>

                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">

                      Draft                      Draft

                    </Badge>                    </Badge>

                  </div>                  </div>

                </CardHeader>                </CardHeader>

                <CardContent className="p-6">                <CardContent className="p-6">

                  {/* Form Sections */}                  {/* Form Sections */}

                  <div className="space-y-8">                  <div className="space-y-8">

                    {/* Basic Information Section */}                    {/* Basic Information Section */}

                    <div className="space-y-4">                    <div className="space-y-4">

                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">

                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />

                        <h3 className="font-semibold text-gray-900 dark:text-white">Basic Information</h3>                        <h3 className="font-semibold text-gray-900 dark:text-white">Basic Information</h3>

                      </div>                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Event Title */}                    {/* Event Title */}

                        <div className="space-y-2">                    <div className="space-y-2">

                          <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">                      <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">

                            <Edit className="h-4 w-4" />                        <Edit className="h-4 w-4" />

                            Event Title *                        Event Title *

                          </Label>                      </Label>

                          <Input                      <Input

                            id="title"                        id="title"

                            value={newEvent.title}                        value={newEvent.title}

                            onChange={(e) => {                        onChange={(e) => {

                              setNewEvent({...newEvent, title: e.target.value})                          setNewEvent({...newEvent, title: e.target.value})

                              if (formErrors.title) setFormErrors({...formErrors, title: ""})                          if (formErrors.title) setFormErrors({...formErrors, title: ""})

                            }}                        }}

                            placeholder="e.g., AI & Machine Learning Workshop"                        placeholder="e.g., AI & Machine Learning Workshop"

                            className={formErrors.title ? "border-red-500 focus:border-red-500" : ""}                        className={formErrors.title ? "border-red-500 focus:border-red-500" : ""}

                          />                      />

                          {formErrors.title && (                      {formErrors.title && (

                            <div className="flex items-center gap-1 text-red-500 text-xs">                        <div className="flex items-center gap-1 text-red-500 text-xs">

                              <AlertCircle className="h-3 w-3" />                          <AlertCircle className="h-3 w-3" />

                              {formErrors.title}                          {formErrors.title}

                            </div>                        </div>

                          )}                      )}

                        </div>                    </div>



                        {/* Location */}                    {/* Location */}

                        <div className="space-y-2">                    <div className="space-y-2">

                          <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">                      <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">

                            <MapPin className="h-4 w-4" />                        <MapPin className="h-4 w-4" />

                            Location *                        Location *

                          </Label>                      </Label>

                          <Input                      <Input

                            id="location"                        id="location"

                            value={newEvent.location}                        value={newEvent.location}

                            onChange={(e) => {                        onChange={(e) => {

                              setNewEvent({...newEvent, location: e.target.value})                          setNewEvent({...newEvent, location: e.target.value})

                              if (formErrors.location) setFormErrors({...formErrors, location: ""})                          if (formErrors.location) setFormErrors({...formErrors, location: ""})

                            }}                        }}

                            placeholder="e.g., Room 101, Tech Building"                        placeholder="e.g., Room 101, Tech Building"

                            className={formErrors.location ? "border-red-500 focus:border-red-500" : ""}                        className={formErrors.location ? "border-red-500 focus:border-red-500" : ""}

                          />                      />

                          {formErrors.location && (                      {formErrors.location && (

                            <div className="flex items-center gap-1 text-red-500 text-xs">                        <div className="flex items-center gap-1 text-red-500 text-xs">

                              <AlertCircle className="h-3 w-3" />                          <AlertCircle className="h-3 w-3" />

                              {formErrors.location}                          {formErrors.location}

                            </div>                        </div>

                          )}                      )}

                        </div>                    </div>



                        {/* Date */}                    {/* Date */}

                        <div className="space-y-2">                    <div className="space-y-2">

                          <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium">                      <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium">

                            <Calendar className="h-4 w-4" />                        <Calendar className="h-4 w-4" />

                            Event Date *                        Event Date *

                          </Label>                      </Label>

                          <Input                      <Input

                            id="date"                        id="date"

                            type="date"                        type="date"

                            value={newEvent.date}                        value={newEvent.date}

                            onChange={(e) => {                        onChange={(e) => {

                              setNewEvent({...newEvent, date: e.target.value})                          setNewEvent({...newEvent, date: e.target.value})

                              if (formErrors.date) setFormErrors({...formErrors, date: ""})                          if (formErrors.date) setFormErrors({...formErrors, date: ""})

                            }}                        }}

                            className={formErrors.date ? "border-red-500 focus:border-red-500" : ""}                        className={formErrors.date ? "border-red-500 focus:border-red-500" : ""}

                            min={new Date().toISOString().split('T')[0]}                        min={new Date().toISOString().split('T')[0]}

                          />                      />

                          {formErrors.date && (                      {formErrors.date && (

                            <div className="flex items-center gap-1 text-red-500 text-xs">                        <div className="flex items-center gap-1 text-red-500 text-xs">

                              <AlertCircle className="h-3 w-3" />                          <AlertCircle className="h-3 w-3" />

                              {formErrors.date}                          {formErrors.date}

                            </div>                        </div>

                          )}                      )}

                        </div>                    </div>



                        {/* Time */}                    {/* Time */}

                        <div className="space-y-2">                    <div className="space-y-2">

                          <Label htmlFor="time" className="flex items-center gap-2 text-sm font-medium">                      <Label htmlFor="time" className="flex items-center gap-2 text-sm font-medium">

                            <Clock className="h-4 w-4" />                        <Clock className="h-4 w-4" />

                            Event Time *                        Event Time *

                          </Label>                      </Label>

                          <Input                      <Input

                            id="time"                        id="time"

                            type="time"                        type="time"

                            value={newEvent.time}                        value={newEvent.time}

                            onChange={(e) => {                        onChange={(e) => {

                              setNewEvent({...newEvent, time: e.target.value})                          setNewEvent({...newEvent, time: e.target.value})

                              if (formErrors.time) setFormErrors({...formErrors, time: ""})                          if (formErrors.time) setFormErrors({...formErrors, time: ""})

                            }}                        }}

                            className={formErrors.time ? "border-red-500 focus:border-red-500" : ""}                        className={formErrors.time ? "border-red-500 focus:border-red-500" : ""}

                          />                      />

                          {formErrors.time && (                      {formErrors.time && (

                            <div className="flex items-center gap-1 text-red-500 text-xs">                        <div className="flex items-center gap-1 text-red-500 text-xs">

                              <AlertCircle className="h-3 w-3" />                          <AlertCircle className="h-3 w-3" />

                              {formErrors.time}                          {formErrors.time}

                            </div>                        </div>

                          )}                      )}

                        </div>                    </div>



                        {/* Max Attendees */}                    {/* Max Attendees */}

                        <div className="space-y-2">                    <div className="space-y-2">

                          <Label htmlFor="maxAttendees" className="flex items-center gap-2 text-sm font-medium">                      <Label htmlFor="maxAttendees" className="flex items-center gap-2 text-sm font-medium">

                            <User2 className="h-4 w-4" />                        <User2 className="h-4 w-4" />

                            Maximum Attendees *                        Maximum Attendees *

                          </Label>                      </Label>

                          <Input                      <Input

                            id="maxAttendees"                        id="maxAttendees"

                            type="number"                        type="number"

                            min="1"                        min="1"

                            value={newEvent.maxAttendees}                        value={newEvent.maxAttendees}

                            onChange={(e) => {                        onChange={(e) => {

                              setNewEvent({...newEvent, maxAttendees: e.target.value})                          setNewEvent({...newEvent, maxAttendees: e.target.value})

                              if (formErrors.maxAttendees) setFormErrors({...formErrors, maxAttendees: ""})                          if (formErrors.maxAttendees) setFormErrors({...formErrors, maxAttendees: ""})

                            }}                        }}

                            placeholder="e.g., 150"                        placeholder="e.g., 150"

                            className={formErrors.maxAttendees ? "border-red-500 focus:border-red-500" : ""}                        className={formErrors.maxAttendees ? "border-red-500 focus:border-red-500" : ""}

                          />                      />

                          {formErrors.maxAttendees && (                      {formErrors.maxAttendees && (

                            <div className="flex items-center gap-1 text-red-500 text-xs">                        <div className="flex items-center gap-1 text-red-500 text-xs">

                              <AlertCircle className="h-3 w-3" />                          <AlertCircle className="h-3 w-3" />

                              {formErrors.maxAttendees}                          {formErrors.maxAttendees}

                            </div>                        </div>

                          )}                      )}

                        </div>                    </div>



                        {/* Activation Date */}                    {/* Activation Date */}

                        <div className="space-y-2">                    <div className="space-y-2">

                          <Label htmlFor="activationDate" className="flex items-center gap-2 text-sm font-medium">                      <Label htmlFor="activationDate" className="flex items-center gap-2 text-sm font-medium">

                            <CheckCircle2 className="h-4 w-4" />                        <CheckCircle2 className="h-4 w-4" />

                            Activation Date *                        Activation Date *

                          </Label>                      </Label>

                          <Input                      <Input

                            id="activationDate"                        id="activationDate"

                            type="date"                        type="date"

                            value={newEvent.activationDate}                        value={newEvent.activationDate}

                            onChange={(e) => {                        onChange={(e) => {

                              setNewEvent({...newEvent, activationDate: e.target.value})                          setNewEvent({...newEvent, activationDate: e.target.value})

                              if (formErrors.activationDate) setFormErrors({...formErrors, activationDate: ""})                          if (formErrors.activationDate) setFormErrors({...formErrors, activationDate: ""})

                            }}                        }}

                            className={formErrors.activationDate ? "border-red-500 focus:border-red-500" : ""}                        className={formErrors.activationDate ? "border-red-500 focus:border-red-500" : ""}

                            min={new Date().toISOString().split('T')[0]}                        min={new Date().toISOString().split('T')[0]}

                          />                      />

                          {formErrors.activationDate ? (                      {formErrors.activationDate ? (

                            <div className="flex items-center gap-1 text-red-500 text-xs">                        <div className="flex items-center gap-1 text-red-500 text-xs">

                              <AlertCircle className="h-3 w-3" />                          <AlertCircle className="h-3 w-3" />

                              {formErrors.activationDate}                          {formErrors.activationDate}

                            </div>                        </div>

                          ) : (                      ) : (

                            <p className="text-xs text-muted-foreground">When should this event be visible to guests?</p>                        <p className="text-xs text-muted-foreground">When should this event be visible to guests?</p>

                          )}                      )}

                        </div>                    </div>

                      </div>                  </div>

                    </div>

                      </div>

                    {/* Description Section */}                    </div>

                    <div className="space-y-4">                    

                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">                    {/* Scheduling Section */}

                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />                    <div className="space-y-4">

                        <h3 className="font-semibold text-gray-900 dark:text-white">Event Description</h3>                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">

                      </div>                        <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />

                      <div className="space-y-2">                        <h3 className="font-semibold text-gray-900 dark:text-white">Scheduling & Capacity</h3>

                        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">                      </div>

                          Detailed Description *                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        </Label>                        {/* Date and Time already included above */}

                        <Textarea                        {/* Max Attendees already included above */}

                          id="description"                        {/* Activation Date already included above */}

                          value={newEvent.description}                      </div>

                          onChange={(e) => {                    </div>

                            setNewEvent({...newEvent, description: e.target.value})                    

                            if (formErrors.description) setFormErrors({...formErrors, description: ""})                    {/* Description Section */}

                          }}                    <div className="space-y-4">

                          placeholder="Provide a comprehensive description of the event, including objectives, agenda, requirements, and what attendees can expect to learn or achieve..."                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">

                          rows={4}                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />

                          className={`resize-none ${formErrors.description ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600"}`}                        <h3 className="font-semibold text-gray-900 dark:text-white">Event Description</h3>

                        />                      </div>

                        {formErrors.description && (                      <div className="space-y-2">

                          <div className="flex items-center gap-1 text-red-500 text-xs">                        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">

                            <AlertCircle className="h-3 w-3" />                          Detailed Description *

                            {formErrors.description}                        </Label>

                          </div>                        <Textarea

                        )}                          id="description"

                      </div>                          value={newEvent.description}

                    </div>                          onChange={(e) => {

                            setNewEvent({...newEvent, description: e.target.value})

                    {/* Settings Section */}                            if (formErrors.description) setFormErrors({...formErrors, description: ""})

                    <div className="space-y-4">                          }}

                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">                          placeholder="Provide a comprehensive description of the event, including objectives, agenda, requirements, and what attendees can expect to learn or achieve..."

                        <CheckCircle2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />                          rows={4}

                        <h3 className="font-semibold text-gray-900 dark:text-white">Event Settings</h3>                          className={`resize-none ${formErrors.description ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-600"}`}

                      </div>                        />

                      {/* Main Event Checkbox */}                        {formErrors.description && (

                      <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">                          <div className="flex items-center gap-1 text-red-500 text-xs">

                        <Checkbox                            <AlertCircle className="h-3 w-3" />

                          id="mainEvent"                            {formErrors.description}

                          checked={newEvent.isMainEvent}                          </div>

                          onCheckedChange={(checked) => setNewEvent({...newEvent, isMainEvent: checked as boolean})}                        )}

                          className="mt-1"                      </div>

                        />                    </div>

                        <div className="space-y-1">                    

                          <Label                    {/* Settings Section */}

                            htmlFor="mainEvent"                    <div className="space-y-4">

                            className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"                      <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">

                          >                        <CheckCircle2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />

                            Feature as main event                        <h3 className="font-semibold text-gray-900 dark:text-white">Event Settings</h3>

                          </Label>                      </div>

                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">

                            This event will be prominently displayed on the homepage hero section and highlighted to all visitors. Only one event can be featured at a time.                      {/* Main Event Checkbox */}

                          </p>                      <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">

                        </div>                        <Checkbox

                      </div>                          id="mainEvent"

                    </div>                          checked={newEvent.isMainEvent}

                  </div>                          onCheckedChange={(checked) => setNewEvent({...newEvent, isMainEvent: checked as boolean})}

                          className="mt-1"

                  {/* Action Buttons */}                        />

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 -m-6 mt-6 p-6">                        <div className="space-y-1">

                    <Button                           <Label

                      variant="outline"                            htmlFor="mainEvent"

                      onClick={() => {                            className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"

                        setShowCreateForm(false)                          >

                        resetForm()                            Feature as main event

                      }}                          </Label>

                      disabled={isSubmitting}                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">

                      className="sm:w-auto border-gray-300 dark:border-gray-600"                            This event will be prominently displayed on the homepage hero section and highlighted to all visitors. Only one event can be featured at a time.

                    >                          </p>

                      Cancel                        </div>

                    </Button>                      </div>

                    <Button                     </div>

                      onClick={handleCreateEvent}                   </div>

                      disabled={isSubmitting}

                      className="bg-blue-600 hover:bg-blue-700 text-white sm:w-auto px-8"                  {/* Action Buttons */}

                    >                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 -m-6 mt-6 p-6">

                      {isSubmitting ? (                    <Button 

                        <>                      variant="outline"

                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />                      onClick={() => {

                          Creating Event...                        setShowCreateForm(false)

                        </>                        resetForm()

                      ) : (                      }}

                        <>                      disabled={isSubmitting}

                          <CheckCircle2 className="h-4 w-4 mr-2" />                      className="sm:w-auto border-gray-300 dark:border-gray-600"

                          Create Event                    >

                        </>                      Cancel

                      )}                    </Button>

                    </Button>                    <Button 

                  </div>                      onClick={handleCreateEvent} 

                </CardContent>                      disabled={isSubmitting}

              </Card>                      className="bg-blue-600 hover:bg-blue-700 text-white sm:w-auto px-8"

            )}                    >

                      {isSubmitting ? (

            {/* Events List */}                        <>

            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm rounded-lg">                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />

              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">                          Creating Event...

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">                        </>

                  <div>                      ) : (

                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Event Registry</CardTitle>                        <>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage all club events and their configurations</p>                          <CheckCircle2 className="h-4 w-4 mr-2" />

                  </div>                          Create Event

                  <div className="flex items-center gap-3">                        </>

                    <div className="relative">                      )}

                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />                    </Button>

                      <Input placeholder="Search events..." className="pl-10 w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />                  </div>

                    </div>                </CardContent>

                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">              </Card>

                      <Calendar className="h-4 w-4 mr-2" />            )}

                      Filter

                    </Button>            {/* Events List */}

                  </div>            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm rounded-lg">

                </div>              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">

              </CardHeader>                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

              <CardContent className="p-0">                  <div>

                {/* Table Header */}                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Event Registry</CardTitle>

                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage all club events and their configurations</p>

                  <div className="col-span-4">Event Details</div>                  </div>

                  <div className="col-span-2">Schedule</div>                  <div className="flex items-center gap-3">

                  <div className="col-span-2">Registration</div>                    <div className="relative">

                  <div className="col-span-2">Status</div>                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

                  <div className="col-span-2">Actions</div>                      <Input placeholder="Search events..." className="pl-10 w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />

                </div>                    </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">

                  {events.map((event) => (                      <Calendar className="h-4 w-4 mr-2" />

                    <div key={event.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">                      Filter

                      {/* Event Details */}                    </Button>

                      <div className="col-span-4 space-y-2">                  </div>

                        <div className="flex items-center gap-3">                </div>

                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{event.title}</h3>              </CardHeader>

                          {event.isMainEvent && (              <CardContent className="p-0">

                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs px-2 py-1">                {/* Table Header */}

                              Featured                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">

                            </Badge>                  <div className="col-span-4">Event Details</div>

                          )}                  <div className="col-span-2">Schedule</div>

                        </div>                  <div className="col-span-2">Registration</div>

                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">{event.description}</p>                  <div className="col-span-2">Status</div>

                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">                  <div className="col-span-2">Actions</div>

                          <MapPin className="h-3 w-3" />                </div>

                          {event.location}                <div className="divide-y divide-gray-200 dark:divide-gray-700">

                        </div>                  {events.map((event) => (

                      </div>                    <div key={event.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">

                                            {/* Event Details */}

                      {/* Schedule */}                      <div className="col-span-4 space-y-2">

                      <div className="col-span-2 space-y-1">                        <div className="flex items-center gap-3">

                        <div className="text-sm font-medium text-gray-900 dark:text-white">                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{event.title}</h3>

                          {formatDate(event.date)}                          {event.isMainEvent && (

                        </div>                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs px-2 py-1">

                        <div className="text-xs text-gray-600 dark:text-gray-400">                              Featured

                          {event.time}                            </Badge>

                        </div>                          )}

                        <div className="text-xs text-gray-500 dark:text-gray-500">                        </div>

                          Live: {formatDate(event.activationDate)}                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">{event.description}</p>

                        </div>                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">

                      </div>                          <MapPin className="h-3 w-3" />

                                                {event.location}

                      {/* Registration */}                        </div>

                      <div className="col-span-2 space-y-2">                      </div>

                        <div className="flex items-center justify-between">                      

                          <span className="text-sm font-medium text-gray-900 dark:text-white">                      {/* Schedule */}

                            {event.registeredAttendees}/{event.maxAttendees}                      <div className="col-span-2 space-y-1">

                          </span>                        <div className="text-sm font-medium text-gray-900 dark:text-white">

                          <span className="text-xs text-gray-600 dark:text-gray-400">                          {formatDate(event.date)}

                            {Math.round((event.registeredAttendees / event.maxAttendees) * 100)}%                        </div>

                          </span>                        <div className="text-xs text-gray-600 dark:text-gray-400">

                        </div>                          {event.time}

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">                        </div>

                          <div                         <div className="text-xs text-gray-500 dark:text-gray-500">

                            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"                           Live: {formatDate(event.activationDate)}

                            style={{ width: `${(event.registeredAttendees / event.maxAttendees) * 100}%` }}                        </div>

                          ></div>                      </div>

                        </div>                      

                        <div className="text-xs text-gray-500 dark:text-gray-500">                      {/* Registration */}

                          {event.maxAttendees - event.registeredAttendees} spots left                      <div className="col-span-2 space-y-2">

                        </div>                        <div className="flex items-center justify-between">

                      </div>                          <span className="text-sm font-medium text-gray-900 dark:text-white">

                                                  {event.registeredAttendees}/{event.maxAttendees}

                      {/* Status */}                          </span>

                      <div className="col-span-2 space-y-2">                          <span className="text-xs text-gray-600 dark:text-gray-400">

                        <Badge                             {Math.round((event.registeredAttendees / event.maxAttendees) * 100)}%

                          className={event.status === "upcoming"                           </span>

                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"                         </div>

                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">

                          }                          <div 

                        >                            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300" 

                          {event.status}                            style={{ width: `${(event.registeredAttendees / event.maxAttendees) * 100}%` }}

                        </Badge>                          ></div>

                        <div>                        </div>

                          <Badge                         <div className="text-xs text-gray-500 dark:text-gray-500">

                            variant="outline"                          {event.maxAttendees - event.registeredAttendees} spots left

                            className={event.isActive                         </div>

                              ? "border-green-300 text-green-700 dark:border-green-600 dark:text-green-400"                       </div>

                              : "border-orange-300 text-orange-700 dark:border-orange-600 dark:text-orange-400"                      

                            }                      {/* Status */}

                          >                      <div className="col-span-2 space-y-2">

                            {event.isActive ? "Live" : "Hidden"}                        <Badge 

                          </Badge>                          className={event.status === "upcoming" 

                        </div>                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 

                      </div>                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"

                                                }

                      {/* Actions */}                        >

                      <div className="col-span-2 flex items-center gap-1">                          {event.status}

                        <Button                        </Badge>

                          variant="outline"                        <div>

                          size="sm"                          <Badge 

                          onClick={() => handleToggleEventActivation(event.id)}                            variant="outline"

                          className="text-xs px-2 py-1 h-7"                            className={event.isActive 

                        >                              ? "border-green-300 text-green-700 dark:border-green-600 dark:text-green-400" 

                          {event.isActive ? "Hide" : "Show"}                              : "border-orange-300 text-orange-700 dark:border-orange-600 dark:text-orange-400"

                        </Button>                            }

                        {!event.isMainEvent && (                          >

                          <Button                            {event.isActive ? "Live" : "Hidden"}

                            variant="outline"                          </Badge>

                            size="sm"                        </div>

                            onClick={() => handleSetMainEvent(event.id)}                      </div>

                            className="text-xs px-2 py-1 h-7"                      

                          >                      {/* Actions */}

                            Feature                      <div className="col-span-2 flex items-center gap-1">

                          </Button>                        <Button

                        )}                          variant="outline"

                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">                          size="sm"

                          <Edit className="h-3 w-3" />                          onClick={() => handleToggleEventActivation(event.id)}

                        </Button>                          className="text-xs px-2 py-1 h-7"

                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">                        >

                          <Trash2 className="h-3 w-3" />                          {event.isActive ? "Hide" : "Show"}

                        </Button>                        </Button>

                      </div>                        {!event.isMainEvent && (

                    </div>                          <Button

                  ))}                            variant="outline"

                </div>                            size="sm"

              </CardContent>                            onClick={() => handleSetMainEvent(event.id)}

            </Card>                            className="text-xs px-2 py-1 h-7"

          </div>                          >

        </main>                            Feature

      </div>                          </Button>

    </div>                        )}

  )                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">

}                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="h-3 w-3" />
                        </Button>
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