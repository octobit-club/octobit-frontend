"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, Calendar, MessageSquare, Target, Users } from "lucide-react"
import SharedHeader from "@/components/shared-header"

export default function MemberDashboard() {
  const { user } = useAuth()
  
  // Mock data for now - you can connect to real data later
  const tasks = [
    { id: "1", title: "Complete project documentation", description: "Write documentation for the latest project", status: "in-progress", dueDate: new Date("2024-11-15") },
    { id: "2", title: "Attend team meeting", description: "Weekly team sync meeting", status: "pending", dueDate: new Date("2024-11-10") },
    { id: "3", title: "Review code submissions", description: "Review submitted code from team members", status: "completed", dueDate: new Date("2024-11-05") },
  ]
  
  const announcements = [
    { id: 1, title: "Department Meeting", content: "Monthly meeting scheduled for next week", isImportant: true, createdAt: new Date("2024-11-01") },
    { id: 2, title: "New Project Launch", content: "Exciting new project starting next month", isImportant: false, createdAt: new Date("2024-10-28") },
  ]

  const activeTasks = tasks.filter((t) => t.status !== "completed")
  const completedTasks = tasks.filter((t) => t.status === "completed")
  const recentAnnouncements = announcements.slice(0, 3)

  // Mock next event data
  const nextEvent = {
    title: "Workshop IA et Machine Learning",
    date: new Date("2024-12-20"),
    location: "Salle de conférence A",
    description: "Atelier pratique sur les bases de l'intelligence artificielle",
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-secondary" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-accent" />
      default:
        return <AlertCircle className="w-4 h-4 text-destructive" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground"
      case "in-progress":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-destructive text-destructive-foreground"
    }
  }

  const updateTaskStatus = (taskId: string, newStatus: "pending" | "in-progress" | "completed") => {
    // This would update the task status in a real app
    console.log(`Updating task ${taskId} to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Tableau de Bord</h1>
            <p className="text-muted-foreground">Bienvenue, {user?.name || "Membre"}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches Actives</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activeTasks.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches Terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{completedTasks.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Annonces</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{announcements.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Département</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">{user?.department || "IT"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Tasks */}
          <Card className="lg:col-span-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Target className="w-5 h-5 text-primary" />
                <span>Mes Tâches</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h4 className="font-medium text-foreground">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <p className="text-xs text-muted-foreground">Échéance: {task.dueDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      {task.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border hover:bg-muted"
                          onClick={() =>
                            updateTaskStatus(task.id, task.status === "pending" ? "in-progress" : "completed")
                          }
                        >
                          {task.status === "pending" ? "Commencer" : "Terminer"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-muted-foreground py-8">Aucune tâche assignée</p>}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Event */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Prochain Événement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">{nextEvent.title}</h4>
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{nextEvent.date.toLocaleDateString()}</span>
                    </p>
                    <p className="mt-1">{nextEvent.location}</p>
                  </div>
                  <p className="text-sm text-foreground">{nextEvent.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">S'inscrire</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Annonces Récentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="p-3 border border-border rounded-lg bg-card">
                      <div className="flex items-center space-x-2 mb-2">
                        {announcement.isImportant && <AlertCircle className="w-4 h-4 text-secondary" />}
                        <h4 className="font-medium text-foreground text-sm">{announcement.title}</h4>
                        {announcement.isImportant && (
                          <Badge className="bg-secondary text-secondary-foreground text-xs">Important</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground">{announcement.createdAt.toLocaleDateString()}</p>
                    </div>
                  ))}
                  {recentAnnouncements.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-4">Aucune annonce</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
