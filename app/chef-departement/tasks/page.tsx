"use client"

import { useAuth } from "@/contexts/auth-context"
import { getTasksByDepartment, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, Clock, AlertCircle, ArrowLeft, Target, Trash2 } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function ChefTasksPage() {
  const users = getAllUsers()
  const user = { id: "2", name: "Chef IT", department: "IT", role: "chef_departement", email: "chef.it@octobit.com" }
  
  // Mock tasks data with examples for IT department
  const tasks = [
    {
      id: "1",
      title: "🚀 Préparer l'atelier IA & Machine Learning",
      description: "Créer les slides, exercices pratiques et matériel pour l'atelier d'introduction à l'IA",
      assignedTo: "4", // David
      assignedBy: "2", // Chef IT
      department: "IT",
      status: "in-progress",
      dueDate: new Date("2025-10-10"),
      createdAt: new Date("2025-09-15"),
      priority: "high"
    },
    {
      id: "2",
      title: "💻 Mettre à jour le site web du club",
      description: "Intégrer les nouvelles fonctionnalités et corriger les bugs signalés",
      assignedTo: "4", // David
      assignedBy: "2", // Chef IT
      department: "IT",
      status: "pending",
      dueDate: new Date("2025-09-25"),
      createdAt: new Date("2025-09-10"),
      priority: "medium"
    },
    {
      id: "3",
      title: "📊 Analyser les données d'engagement",
      description: "Créer un rapport sur l'engagement des membres dans les activités",
      assignedTo: "4", // David
      assignedBy: "2", // Chef IT
      department: "IT",
      status: "completed",
      dueDate: new Date("2025-09-15"),
      createdAt: new Date("2025-09-01"),
      priority: "low"
    }
  ]

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      console.log("Deleting task:", taskId)
      alert("La suppression de la tâche serait implémentée ici")
    }
  }

  const getUserName = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId)
    return foundUser?.name || "Utilisateur inconnu"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    pending: tasks.filter(t => t.status === "pending").length
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Gestion Tâches</h2>
              <p className="text-sm text-muted-foreground">Département {user.department}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link href="/chef-departement">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Dashboard
              </Button>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gestion des Tâches</h1>
                <p className="text-muted-foreground">Département {user.department}</p>
              </div>
              <Link href="/chef-departement/tasks/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Tâche
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tâches</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En Cours</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Terminées</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>Liste des Tâches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(task.status)}
                            <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status === "pending" ? "En attente" : 
                               task.status === "in-progress" ? "En cours" : "Terminée"}
                            </Badge>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === "high" ? "Haute" : 
                               task.priority === "medium" ? "Moyenne" : "Basse"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>
                              👤 Assigné à: <strong>{getUserName(task.assignedTo)}</strong>
                            </span>
                            <span>
                              📅 Échéance: <strong>{task.dueDate.toLocaleDateString("fr-FR")}</strong>
                            </span>
                            <span>
                              📝 Créé le: <strong>{task.createdAt.toLocaleDateString("fr-FR")}</strong>
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50 ml-4"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
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
