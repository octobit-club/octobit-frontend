"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getTasksByDepartment, getAnnouncementsByDepartment, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, CheckCircle, Clock, AlertCircle, MessageSquare, LogOut, Crown, Target, TrendingUp, Calendar, Award, Star, Settings, BarChart3, UserCheck } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function ChefDepartementPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  // Enhanced mock data with more details
  const tasks = [
    { 
      id: 1, 
      title: "🎯 Préparer matériel atelier IA", 
      status: "in-progress", 
      dueDate: new Date("2024-11-20"),
      assignedTo: "Alice Johnson",
      priority: "high",
      progress: 65,
      category: "Formation",
      description: "Créer slides et exercices pratiques pour l'atelier IA"
    },
    { 
      id: 2, 
      title: "📋 Évaluer candidatures membres", 
      status: "pending", 
      dueDate: new Date("2024-11-15"),
      assignedTo: "Bob Smith",
      priority: "medium",
      progress: 20,
      category: "Recrutement",
      description: "Examiner et noter les nouvelles candidatures"
    },
    { 
      id: 3, 
      title: "📚 Mise à jour règlement département", 
      status: "completed", 
      dueDate: new Date("2024-11-10"),
      assignedTo: "Carol Williams",
      priority: "low",
      progress: 100,
      category: "Administration",
      description: "Réviser et actualiser le règlement interne"
    },
    { 
      id: 4, 
      title: "🚀 Planifier hackathon départemental", 
      status: "pending", 
      dueDate: new Date("2024-12-01"),
      assignedTo: "Non assigné",
      priority: "high",
      progress: 5,
      category: "Événement",
      description: "Organiser le concours de programmation annuel"
    },
  ]
  
  const announcements = [
    { 
      id: 1, 
      title: "🎯 Réunion Mensuelle Département", 
      content: "Réunion d'équipe prévue pour la semaine prochaine. Ordre du jour : nouveaux projets, évaluations et objectifs Q4.", 
      isImportant: true, 
      createdAt: new Date("2024-11-01"),
      category: "Réunion",
      author: "Chef Département"
    },
    { 
      id: 2, 
      title: "🎓 Session d'accueil nouveaux membres", 
      content: "Journée d'intégration pour accueillir les 5 nouveaux membres du département.", 
      isImportant: false, 
      createdAt: new Date("2024-10-28"),
      category: "Intégration",
      author: "Équipe RH"
    },
    { 
      id: 3, 
      title: "🏆 Félicitations équipe projet X", 
      content: "L'équipe du projet X a remporté le premier prix au concours inter-départemental !", 
      isImportant: true, 
      createdAt: new Date("2024-10-25"),
      category: "Récompense",
      author: "Direction"
    },
  ]

  const departmentMembers = [
    { 
      id: 1, 
      name: "Alice Johnson", 
      department: "IT", 
      role: "Senior Developer",
      tasksCompleted: 15,
      performance: 92,
      joinDate: new Date("2023-01-15"),
      skills: ["React", "Node.js", "AI/ML"]
    },
    { 
      id: 2, 
      name: "Bob Smith", 
      department: "IT", 
      role: "UI/UX Designer",
      tasksCompleted: 12,
      performance: 88,
      joinDate: new Date("2023-03-20"),
      skills: ["Figma", "Design System", "Prototyping"]
    },
    { 
      id: 3, 
      name: "Carol Williams", 
      department: "IT", 
      role: "DevOps Engineer",
      tasksCompleted: 18,
      performance: 95,
      joinDate: new Date("2022-09-10"),
      skills: ["Docker", "AWS", "CI/CD"]
    },
    { 
      id: 4, 
      name: "David Brown", 
      department: "IT", 
      role: "Data Analyst",
      tasksCompleted: 10,
      performance: 85,
      joinDate: new Date("2024-02-01"),
      skills: ["Python", "SQL", "Tableau"]
    },
  ]

  // Performance metrics
  const departmentMetrics = {
    totalMembers: departmentMembers.length,
    averagePerformance: Math.round(departmentMembers.reduce((sum, member) => sum + member.performance, 0) / departmentMembers.length),
    totalTasksCompleted: departmentMembers.reduce((sum, member) => sum + member.tasksCompleted, 0),
    monthlyGoal: 60,
    completionRate: 78,
  }
  
  const activeTasks = tasks.filter((t) => t.status !== "completed")
  const recentAnnouncements = announcements.slice(0, 3)
  const topPerformers = departmentMembers.sort((a, b) => b.performance - a.performance).slice(0, 3)

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Crown className="h-8 w-8 text-accent" />
              Gestion {user?.department || "IT"}
            </h1>
            <p className="text-muted-foreground">Bienvenue, {user?.name || "Chef"} • {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
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

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Membres Équipe</CardTitle>
              <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{departmentMetrics.totalMembers}</div>
              <div className="text-xs text-muted-foreground">
                Performance moyenne: {departmentMetrics.averagePerformance}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches Complétées</CardTitle>
              <BarChart3 className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">{departmentMetrics.totalTasksCompleted}</div>
              <Progress value={departmentMetrics.completionRate} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">{departmentMetrics.completionRate}% de réussite</div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches Actives</CardTitle>
              <Target className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{activeTasks.length}</div>
              <div className="text-xs text-muted-foreground">
                {tasks.filter(t => t.priority === "high").length} priorité haute
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Communications</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{announcements.length}</div>
              <div className="text-xs text-muted-foreground">
                {announcements.filter(a => a.isImportant).length} importantes
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Gestion Tâches
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Équipe
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Communications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Actions */}
            {/* Dashboard Overview Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Tasks */}
              <Card className="lg:col-span-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Tâches Récentes
                    </div>
                    <Badge variant="outline">{activeTasks.length} actives</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeTasks.slice(0, 4).map((task) => (
                      <div key={task.id} className={`p-4 border border-border rounded-xl hover:shadow-md transition-all group ${
                        task.priority === "high" ? "border-l-4 border-l-destructive" : 
                        task.priority === "medium" ? "border-l-4 border-l-accent" : "border-l-4 border-l-muted"
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3 flex-1">
                            {getStatusIcon(task.status)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground">{task.title}</h4>
                                <Badge variant="secondary" className="text-xs">{task.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <Progress value={task.progress} className="h-2 flex-1" />
                                <span className="text-xs font-medium text-muted-foreground">{task.progress}%</span>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>👤 {task.assignedTo}</span>
                                <span>📅 {task.dueDate.toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status === "pending" ? "En attente" : task.status === "in-progress" ? "En cours" : "Terminée"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar with Team Performance and Announcements */}
              <div className="space-y-6">
                {/* Top Performers */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Award className="h-5 w-5 text-primary" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPerformers.map((member, index) => (
                        <div key={member.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground text-sm">{member.name}</h5>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-primary">{member.performance}%</div>
                            <div className="text-xs text-muted-foreground">{member.tasksCompleted} tâches</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Announcements */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Annonces Récentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAnnouncements.map((announcement) => (
                        <div key={announcement.id} className={`p-4 border border-border rounded-lg hover:shadow-md transition-all ${
                          announcement.isImportant ? 'bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20' : 'bg-muted/20'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {announcement.isImportant && <AlertCircle className="w-4 h-4 text-destructive animate-pulse" />}
                              <Badge className={`text-xs ${announcement.isImportant ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                {announcement.category}
                              </Badge>
                            </div>
                          </div>
                          <h4 className="font-semibold text-foreground text-sm mb-2">{announcement.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{announcement.content}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>👤 {announcement.author}</span>
                            <span>📅 {announcement.createdAt.toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Task Management Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task Creation Quick Form */}
              <Card className="lg:col-span-2 border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Plus className="h-5 w-5 text-primary" />
                      Créer une Nouvelle Tâche
                    </CardTitle>
                    <Link href="/chef-departement/tasks">
                      <Button variant="outline" size="sm">
                        Voir Toutes les Tâches
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Titre</label>
                      <input 
                        className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                        placeholder="Titre de la tâche..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Assigner à</label>
                      <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                        <option>Sélectionner un membre</option>
                        <option>Alice Johnson</option>
                        <option>Bob Smith</option>
                        <option>Carol Williams</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                      <textarea 
                        className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                        rows={3}
                        placeholder="Description détaillée de la tâche..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Priorité</label>
                      <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                        <option>Basse</option>
                        <option>Moyenne</option>
                        <option>Haute</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Date d'échéance</label>
                      <input 
                        type="date"
                        className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer la Tâche
                  </Button>
                </CardContent>
              </Card>

              {/* Task Summary */}
              <div className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Résumé des Tâches</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">En attente</span>
                      <span className="text-sm font-medium text-destructive">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">En cours</span>
                      <span className="text-sm font-medium text-accent">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Terminées</span>
                      <span className="text-sm font-medium text-secondary">1</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Membres Actifs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {departmentMembers.slice(0, 3).map((member, index) => (
                        <div key={member.id} className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">{member.name[0]}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Tasks */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  Tâches Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(task.status)}
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{task.title}</h4>
                          <p className="text-xs text-muted-foreground">Assigné à {task.assignedTo}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Management Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team Overview */}
              <Card className="lg:col-span-2 border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      Membres du Département
                    </CardTitle>
                    <Link href="/chef-departement/members">
                      <Button variant="outline" size="sm">
                        Voir Tous les Membres
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-medium text-primary">{member.name[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role === "chef_departement" ? "Chef de Département" : "Membre"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.role === "chef_departement" ? "default" : "outline"}>
                            {member.performance}% perf.
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {member.tasksCompleted} tâches
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Stats */}
              <div className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Performance Équipe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Moyenne générale</span>
                          <span className="font-medium text-foreground">{departmentMetrics.averagePerformance}%</span>
                        </div>
                        <Progress value={departmentMetrics.averagePerformance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Tâches complétées</span>
                          <span className="font-medium text-foreground">{departmentMetrics.totalTasksCompleted}/{departmentMetrics.monthlyGoal}</span>
                        </div>
                        <Progress value={(departmentMetrics.totalTasksCompleted / departmentMetrics.monthlyGoal) * 100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {topPerformers.map((member, index) => (
                        <div key={member.id} className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                            index === 1 ? 'bg-gray-100 text-gray-800' : 
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium text-foreground">{member.name}</span>
                            <div className="text-xs text-muted-foreground">{member.performance}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            {/* Announcements Management Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Announcement Form */}
              <Card className="lg:col-span-2 border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Créer une Nouvelle Annonce
                    </CardTitle>
                    <Link href="/chef-departement/announcements">
                      <Button variant="outline" size="sm">
                        Voir Toutes les Annonces
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Titre</label>
                      <input 
                        className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                        placeholder="Titre de l'annonce..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Contenu</label>
                      <textarea 
                        className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                        rows={4}
                        placeholder="Contenu détaillé de l'annonce..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Cible</label>
                        <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                          <option>Mon département seulement</option>
                          <option>Tous les départements</option>
                          <option>Admins seulement</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <input 
                          type="checkbox" 
                          id="important"
                          className="rounded border-border"
                        />
                        <label htmlFor="important" className="text-sm font-medium text-foreground">
                          Marquer comme important
                        </label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Publier l'Annonce
                  </Button>
                </CardContent>
              </Card>

              {/* Announcements Summary */}
              <div className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Résumé Communications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Totales</span>
                      <span className="text-sm font-medium text-foreground">{announcements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Importantes</span>
                      <span className="text-sm font-medium text-destructive">{announcements.filter(a => a.isImportant).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cette semaine</span>
                      <span className="text-sm font-medium text-accent">2</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Taux de lecture</span>
                        <span className="font-medium text-foreground">87%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Engagement</span>
                        <span className="font-medium text-foreground">92%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Announcements */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Annonces Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className={`p-4 border rounded-lg hover:bg-muted/20 transition-colors ${
                      announcement.isImportant ? 'border-destructive/20 bg-destructive/5' : 'border-border'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {announcement.isImportant && <AlertCircle className="w-4 h-4 text-destructive" />}
                          <h4 className="font-medium text-foreground text-sm">{announcement.title}</h4>
                        </div>
                        <Badge className={`text-xs ${announcement.isImportant ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                          {announcement.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{announcement.content}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>📅 {announcement.createdAt.toLocaleDateString('fr-FR')}</span>
                        <span>👤 {announcement.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
