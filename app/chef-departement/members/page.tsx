"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, UserCheck, ArrowLeft, Eye, Award, Calendar } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import { useState } from "react"

export default function ChefMembersPage() {
  const allUsers: import("@/lib/auth").User[] = getAllUsers()
  const user: import("@/lib/auth").User = { id: "2", name: "Chef IT", department: "IT", role: "chef_departement", email: "chef.it@octobit.com", createdAt: new Date() }
  const [selectedMember, setSelectedMember] = useState<import("@/lib/auth").User | null>(null)

  const departmentMembers = allUsers.filter((u) => u.department === user.department)
  const members = departmentMembers.filter((u) => u.role === "membre")

  // Enhanced mock member data with performance stats
  const enhancedMembers = departmentMembers.map(member => ({
    ...member,
    tasksCompleted: Math.floor(Math.random() * 20) + 5,
    performance: Math.floor(Math.random() * 30) + 70,
    skills: member.role === "membre" ? 
      ["React", "TypeScript", "Node.js", "Python"][Math.floor(Math.random() * 4)] : 
      "Management",
    projectsCount: Math.floor(Math.random() * 8) + 2,
    lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  }))

  const stats = {
    total: departmentMembers.length,
    activeMembers: members.length,
    averagePerformance: Math.round(enhancedMembers.reduce((sum, member) => sum + member.performance, 0) / enhancedMembers.length),
    totalTasks: enhancedMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Équipe</h2>
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
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestion de l'Équipe</h1>
              <p className="text-muted-foreground">Département {user.department}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Membres</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Membres Actifs</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.activeMembers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance Moy.</CardTitle>
                  <Award className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.averagePerformance}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tâches Total</CardTitle>
                  <Award className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalTasks}</div>
                </CardContent>
              </Card>
            </div>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Liste des Membres du Département</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancedMembers.map((member) => (
                    <div key={member.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold text-lg">{member.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span>📊 Performance: {member.performance}%</span>
                              <span>✅ Tâches: {member.tasksCompleted}</span>
                              <span>📅 Actif: {member.lastActivity.toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={member.role === "chef_departement" ? "default" : "outline"}>
                            {member.role === "chef_departement" ? "Chef" : "Membre"}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedMember(member)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Détails
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Détails du Membre</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-primary font-bold text-2xl">{member.name.charAt(0).toUpperCase()}</span>
                                  </div>
                                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                                  <p className="text-sm text-muted-foreground">{member.email}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Rôle:</span>
                                    <p className="text-muted-foreground">{member.role === "chef_departement" ? "Chef de Département" : "Membre"}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Département:</span>
                                    <p className="text-muted-foreground">{member.department}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Performance:</span>
                                    <p className="text-muted-foreground">{member.performance}%</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Tâches Complétées:</span>
                                    <p className="text-muted-foreground">{member.tasksCompleted}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Projets:</span>
                                    <p className="text-muted-foreground">{member.projectsCount}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Compétences:</span>
                                    <p className="text-muted-foreground">{member.skills}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Rejoint le:</span>
                                    <p className="text-muted-foreground">{member.createdAt.toLocaleDateString("fr-FR")}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Dernière activité:</span>
                                    <p className="text-muted-foreground">{member.lastActivity.toLocaleDateString("fr-FR")}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
