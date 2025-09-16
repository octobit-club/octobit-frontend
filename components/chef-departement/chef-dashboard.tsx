"use client"

import { useAuth } from "@/contexts/auth-context"
import { getTasksByDepartment, getAnnouncementsByDepartment, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Users, CheckCircle, Clock, AlertCircle, MessageSquare, LogOut } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function ChefDashboard() {
  const { user, logout } = useAuth()
  
  // Mock data for now - you can connect to real data later
  const tasks = [
    { id: 1, title: "Prepare workshop materials", status: "in-progress", dueDate: new Date("2024-10-20") },
    { id: 2, title: "Review member applications", status: "pending", dueDate: new Date("2024-10-15") },
    { id: 3, title: "Update department guidelines", status: "completed", dueDate: new Date("2024-10-10") },
  ]
  
  const announcements = [
    { id: 1, title: "Department Meeting", content: "Monthly meeting scheduled for next week", isImportant: true, createdAt: new Date("2024-10-01") },
    { id: 2, title: "New Member Orientation", content: "Welcome session for new members", isImportant: false, createdAt: new Date("2024-09-28") },
  ]

  const departmentMembers = [
    { id: 1, name: "Alice Johnson", department: "IT" },
    { id: 2, name: "Bob Smith", department: "IT" },
    { id: 3, name: "Carol Williams", department: "IT" },
  ]
  
  const activeTasks = tasks.filter((t) => t.status !== "completed")
  const recentAnnouncements = announcements.slice(0, 3)

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

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de Bord - {user?.department || "IT"}</h1>
            <p className="text-muted-foreground">Bienvenue, {user?.name || "Chef"}</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="border-border hover:bg-muted flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Membres du Département</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{departmentMembers.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches Actives</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">{activeTasks.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tâches</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-foreground">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Annonces</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{announcements.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/chef-departement/tasks/new">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Tâche
            </Button>
          </Link>
          <Link href="/chef-departement/announcements/new">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Annonce
            </Button>
          </Link>
          <Link href="/chef-departement/tasks">
            <Button variant="outline" className="w-full border-border bg-transparent hover:bg-muted">
              Voir Toutes les Tâches
            </Button>
          </Link>
          <Link href="/chef-departement/members">
            <Button variant="outline" className="w-full border-border bg-transparent hover:bg-muted">
              Gérer les Membres
            </Button>
          </Link>
        </div>

        {/* Recent Tasks and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tasks */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-foreground">
                Tâches Récentes
                <Link href="/chef-departement/tasks">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Voir tout
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-card">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">Échéance: {task.dueDate.toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-foreground">
                Annonces Récentes
                <Link href="/chef-departement/announcements">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Voir tout
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-3 border border-border rounded-lg bg-card">
                    <div className="flex items-center space-x-2 mb-2">
                      {announcement.isImportant && <AlertCircle className="w-4 h-4 text-accent" />}
                      <h4 className="font-medium text-foreground">{announcement.title}</h4>
                      {announcement.isImportant && <Badge className="bg-accent text-accent-foreground">Important</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground">{announcement.createdAt.toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
