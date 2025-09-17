"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Calendar, MessageSquare, Target, Users, LogOut, Trophy, TrendingUp, Star, BookOpen, Award } from "lucide-react"
import SharedHeader from "@/components/shared-header"

export default function MembrePage() {
  const { user, logout } = useAuth()
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update time every minute for dynamic feeling
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  // Tasks assigned by admins - Enhanced mock data with admin assignment details
  const tasks = [
    { 
      id: "1", 
      title: "Finaliser la documentation du projet IA", 
      description: "Rédiger la documentation technique complète pour le projet d'intelligence artificielle", 
      status: "in-progress", 
      dueDate: new Date("2024-11-15"),
      priority: "high",
      progress: 75,
      category: "Documentation",
      assignedBy: "Admin Principal",
      assignedDate: new Date("2024-11-01"),
      assignedTo: user?.name || "Membre",
      department: "IT"
    },
    { 
      id: "2", 
      title: "Présentation Workshop ML", 
      description: "Préparer et présenter l'atelier sur le Machine Learning pour les nouveaux membres", 
      status: "pending", 
      dueDate: new Date("2024-11-12"),
      priority: "medium",
      progress: 30,
      category: "Présentation",
      assignedBy: "Chef Département IT",
      assignedDate: new Date("2024-11-03"),
      assignedTo: user?.name || "Membre",
      department: "IT"
    },
    { 
      id: "3", 
      title: "Code Review - Module Auth", 
      description: "Examiner et valider le code du module d'authentification", 
      status: "completed", 
      dueDate: new Date("2024-11-05"),
      priority: "high",
      progress: 100,
      category: "Développement",
      assignedBy: "Admin Principal",
      assignedDate: new Date("2024-10-25"),
      assignedTo: user?.name || "Membre",
      department: "IT"
    },
    { 
      id: "4", 
      title: "Mise à jour base de données", 
      description: "Optimiser les requêtes et mettre à jour la structure de la base de données principale", 
      status: "pending", 
      dueDate: new Date("2024-11-20"),
      priority: "low",
      progress: 10,
      category: "Base de données",
      assignedBy: "Admin Technique",
      assignedDate: new Date("2024-11-05"),
      assignedTo: user?.name || "Membre",
      department: "IT"
    },
    { 
      id: "5", 
      title: "Formation sécurité informatique", 
      description: "Compléter le module de formation obligatoire sur la sécurité informatique", 
      status: "pending", 
      dueDate: new Date("2024-11-18"),
      priority: "medium",
      progress: 0,
      category: "Formation",
      assignedBy: "Admin RH",
      assignedDate: new Date("2024-11-06"),
      assignedTo: user?.name || "Membre",
      department: "Général"
    },
  ]
  
  const announcements = [
    { 
      id: 1, 
      title: "🚀 Lancement Hackathon 2024", 
      content: "Grand hackathon inter-départements avec des prix exceptionnels ! Inscriptions ouvertes jusqu'au 15 novembre.", 
      isImportant: true, 
      createdAt: new Date("2024-11-01"),
      author: "Admin",
      category: "Événement"
    },
    { 
      id: 2, 
      title: "📚 Nouveau cours IA disponible", 
      content: "Cours avancé sur l'intelligence artificielle et le deep learning maintenant accessible sur la plateforme.", 
      isImportant: false, 
      createdAt: new Date("2024-10-28"),
      author: "Équipe Pédagogique",
      category: "Formation"
    },
    { 
      id: 3, 
      title: "🎯 Objectifs mensuels mis à jour", 
      content: "Les nouveaux objectifs du mois de novembre sont maintenant disponibles dans votre espace personnel.", 
      isImportant: false, 
      createdAt: new Date("2024-10-25"),
      author: "Chef Département",
      category: "Objectifs"
    },
  ]

  // Achievement system
  const achievements = [
    { id: 1, title: "Premier pas", description: "Première tâche complétée", earned: true, icon: "🏆" },
    { id: 2, title: "Collaborateur", description: "5 tâches d'équipe terminées", earned: true, icon: "🤝" },
    { id: 3, title: "Expert", description: "10 tâches techniques accomplies", earned: false, icon: "⭐" },
    { id: 4, title: "Mentor", description: "Aider 3 collègues", earned: false, icon: "🎓" },
  ]

  // Performance metrics
  const performanceMetrics = {
    tasksCompleted: tasks.filter(t => t.status === "completed").length,
    totalTasks: tasks.length,
    averageProgress: Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length),
    weeklyGoal: 5,
    completedThisWeek: 3,
  }

  const filteredTasks = selectedTaskFilter === "all" ? tasks : tasks.filter(t => t.status === selectedTaskFilter)
  const activeTasks = tasks.filter((t) => t.status !== "completed")
  const completedTasks = tasks.filter((t) => t.status === "completed")
  const recentAnnouncements = announcements.slice(0, 3)

  // Enhanced next events data
  const upcomingEvents = [
    {
      id: 1,
      title: "🤖 Workshop IA et Machine Learning",
      date: new Date("2024-11-20"),
      time: "14:00",
      location: "Salle de conférence A",
      description: "Atelier pratique sur les bases de l'intelligence artificielle et ses applications",
      attendees: 25,
      maxAttendees: 30,
      category: "Formation",
      difficulty: "Intermédiaire"
    },
    {
      id: 2,
      title: "🎨 Concours Design UI/UX",
      date: new Date("2024-11-25"),
      time: "10:00",
      location: "Lab Design",
      description: "Compétition créative pour concevoir la meilleure interface utilisateur",
      attendees: 18,
      maxAttendees: 20,
      category: "Concours",
      difficulty: "Tous niveaux"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-secondary animate-pulse" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-accent animate-spin" style={{animationDuration: '3s'}} />
      default:
        return <AlertCircle className="w-5 h-5 text-destructive" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      case "in-progress":
        return "bg-accent text-accent-foreground hover:bg-accent/80"
      default:
        return "bg-destructive/10 text-destructive hover:bg-destructive/20"
    }
  }

  const updateTaskStatus = (taskId: string, newStatus: "pending" | "in-progress" | "completed") => {
    // This would update the task status in a real app
    console.log(`Updating task ${taskId} to ${newStatus}`)
    // Add some visual feedback
    const button = document.activeElement as HTMLButtonElement
    if (button) {
      button.style.transform = 'scale(0.95)'
      setTimeout(() => {
        button.style.transform = 'scale(1)'
      }, 150)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Tableau de Bord</h1>
            <p className="text-muted-foreground">Bienvenue, {user?.name || "Membre"} - Voici les tâches qui vous sont assignées</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-primary font-medium">Tâches assignées par l'administration</span>
            </div>
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

        {/* Enhanced Stats Cards with animations and progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches Actives</CardTitle>
              <Target className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">{activeTasks.length}</div>
              <div className="text-xs text-muted-foreground">
                {performanceMetrics.averageProgress}% de progression moyenne
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">{performanceMetrics.completedThisWeek}/{performanceMetrics.weeklyGoal}</div>
              <Progress value={(performanceMetrics.completedThisWeek / performanceMetrics.weeklyGoal) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">Objectif hebdomadaire</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Réussites</CardTitle>
              <Trophy className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">{achievements.filter(a => a.earned).length}/{achievements.length}</div>
              <div className="text-xs text-muted-foreground">Badges débloqués</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Département</CardTitle>
              <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground mb-1">{user?.department || "IT"}</div>
              <div className="text-xs text-muted-foreground">Membre actif</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Announcements Section */}
        <Card className="border-border bg-card mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Annonces Récentes</span>
                <Badge variant="outline" className="ml-2">{announcements.length}</Badge>
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                Dernière mise à jour: {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {recentAnnouncements.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {recentAnnouncements.map((announcement, index) => (
                  <div key={announcement.id} className={`p-5 border border-border rounded-xl hover:shadow-md transition-all duration-300 group ${
                    announcement.isImportant ? 'bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20' : 'bg-muted/20 hover:bg-muted/30'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {announcement.isImportant && <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 animate-pulse" />}
                        <Badge className={`text-xs ${announcement.isImportant ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                          {announcement.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">#{index + 1}</div>
                    </div>
                    
                    <h4 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{announcement.content}</p>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>👤 {announcement.author}</span>
                      </div>
                      <span>📅 {announcement.createdAt.toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">Aucune annonce disponible</p>
                <p className="text-muted-foreground text-sm mt-2">Les nouvelles annonces apparaîtront ici</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Tasks Section */}
          <Card className="lg:col-span-2 border-border bg-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Tâches Assignées par l'Administration</span>
                  <Badge variant="outline">{filteredTasks.length}</Badge>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse ml-2"></div>
                </CardTitle>
                
                {/* Task Filter Buttons */}
                <div className="flex gap-2">
                  {["all", "pending", "in-progress", "completed"].map((filter) => (
                    <Button
                      key={filter}
                      size="sm"
                      variant={selectedTaskFilter === filter ? "default" : "outline"}
                      onClick={() => setSelectedTaskFilter(filter as any)}
                      className="capitalize text-xs"
                    >
                      {filter === "all" ? "Toutes" : filter === "pending" ? "En attente" : filter === "in-progress" ? "En cours" : "Terminées"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className={`p-5 border border-border rounded-xl hover:shadow-md transition-all duration-300 group relative ${
                    task.priority === "high" ? "border-l-4 border-l-destructive" : 
                    task.priority === "medium" ? "border-l-4 border-l-accent" : "border-l-4 border-l-muted"
                  }`}>
                    {/* Admin Assignment Header */}
                    <div className="flex items-center justify-between mb-3 p-2 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-primary">Assigné par: {task.assignedBy}</span>
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary">{task.department}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        📅 {task.assignedDate.toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{task.title}</h4>
                            <Badge variant="secondary" className="text-xs">{task.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="flex items-center gap-2 mb-3">
                            <Progress value={task.progress} className="h-2 flex-1" />
                            <span className="text-xs font-medium text-muted-foreground">{task.progress}%</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span>⏰ Échéance: {task.dueDate.toLocaleDateString('fr-FR')}</span>
                              <span>👤 Pour: {task.assignedTo}</span>
                            </div>
                            <Badge className={`text-xs ${
                              task.priority === "high" ? "bg-destructive/10 text-destructive" :
                              task.priority === "medium" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                            }`}>
                              {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"} priorité
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === "pending" ? "En attente" : task.status === "in-progress" ? "En cours" : "Terminée"}
                        </Badge>
                        {task.status !== "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border hover:bg-primary hover:text-primary-foreground whitespace-nowrap transition-all"
                            onClick={() => updateTaskStatus(task.id, task.status === "pending" ? "in-progress" : "completed")}
                          >
                            {task.status === "pending" ? "▶️ Commencer" : "✅ Terminer"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredTasks.length === 0 && (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground text-lg">Aucune tâche dans cette catégorie</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Événements Prochains</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">{event.category}</Badge>
                      </div>
                      
                      <div className="space-y-2 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{event.date.toLocaleDateString('fr-FR')} à {event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 text-primary" />
                          <span>{event.attendees}/{event.maxAttendees} participants</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3">{event.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <Badge className="text-xs bg-primary/10 text-primary">{event.difficulty}</Badge>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          S'inscrire
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Mes Réussites</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-3 rounded-lg border transition-all ${
                      achievement.earned 
                        ? "border-primary/20 bg-primary/5" 
                        : "border-border bg-muted/20 opacity-60"
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-lg">{achievement.icon}</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-sm text-foreground">{achievement.title}</h5>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && <CheckCircle className="w-4 h-4 text-primary" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
