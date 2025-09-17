"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAnnouncementsByDepartment, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, ArrowLeft, MessageSquare, Trash2 } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function ChefAnnouncementsPage() {
  const users = getAllUsers()
  const user = { id: "2", name: "Chef IT", department: "IT", role: "chef_departement" }
  
  // Mock announcements data with examples for IT department
  const announcements = [
    {
      id: "1",
      title: "🎯 Réunion Mensuelle Département IT",
      content: "Réunion d'équipe prévue pour vendredi prochain. Ordre du jour : nouveaux projets IA, évaluations trimestrielles et planification du hackathon.",
      author: "2", // Chef IT
      targetDepartment: "IT",
      createdAt: new Date("2025-09-15"),
      isImportant: true
    },
    {
      id: "2",
      title: "🚀 Lancement du projet Web 3.0",
      content: "Nous commençons officiellement le développement de la nouvelle plateforme Web 3.0 du club. Toute l'équipe IT est mobilisée.",
      author: "2", // Chef IT
      targetDepartment: "IT",
      createdAt: new Date("2025-09-12"),
      isImportant: false
    },
    {
      id: "3",
      title: "🏆 Félicitations pour l'atelier IA",
      content: "L'atelier d'introduction à l'IA a été un grand succès avec plus de 60 participants ! Merci à toute l'équipe pour leur excellent travail.",
      author: "2", // Chef IT
      targetDepartment: "IT",
      createdAt: new Date("2025-09-10"),
      isImportant: false
    }
  ]

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      console.log("Deleting announcement:", announcementId)
      alert("La suppression de l'annonce serait implémentée ici")
    }
  }

  const getUserName = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId)
    return foundUser?.name || "Utilisateur inconnu"
  }

  const stats = {
    total: announcements.length,
    important: announcements.filter(a => a.isImportant).length,
    recent: announcements.filter(a => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return a.createdAt > weekAgo
    }).length
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Annonces</h2>
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
                <h1 className="text-3xl font-bold text-foreground">Gestion des Annonces</h1>
                <p className="text-muted-foreground">Département {user.department}</p>
              </div>
              <Link href="/chef-departement/announcements/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Annonce
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Annonces</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Importantes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.important}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cette Semaine</CardTitle>
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.recent}</div>
                </CardContent>
              </Card>
            </div>

            {/* Announcements List */}
            <Card>
              <CardHeader>
                <CardTitle>Liste des Annonces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                      announcement.isImportant ? "border-yellow-400 bg-yellow-50/50" : "border-border"
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2 flex-1">
                          {announcement.isImportant && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                          <h3 className="text-xl font-semibold text-foreground">{announcement.title}</h3>
                          {announcement.isImportant && (
                            <Badge className="bg-yellow-100 text-yellow-800">Important</Badge>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>

                      <p className="text-muted-foreground mb-4">{announcement.content}</p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>
                            👤 Par: <strong>{getUserName(announcement.author)}</strong>
                          </span>
                          <span>
                            🎯 Cible: <strong>{announcement.targetDepartment || "Tous les départements"}</strong>
                          </span>
                        </div>
                        <span>📅 {announcement.createdAt.toLocaleDateString("fr-FR")}</span>
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
