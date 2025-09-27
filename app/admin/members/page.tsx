"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllUsers, getAllTasks } from "@/lib/data"
import type { User } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Users, UserCheck, Crown, ArrowLeft, Eye, Trash2, CheckSquare, ClipboardList } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminMembersPage() {
  const users: User[] = getAllUsers()
  const tasks = getAllTasks()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "membre" as "admin" | "chef_departement" | "membre",
    department: ""
  })

  // Helper functions to calculate task statistics
  const getTasksGivenByUser = (userId: string) => {
    return tasks.filter(task => task.assignedBy === userId).length
  }

  const getTasksDoneByUser = (userId: string) => {
    return tasks.filter(task => task.assignedTo === userId && task.status === "completed").length
  }

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    chefs: users.filter((u) => u.role === "chef_departement").length,
    members: users.filter((u) => u.role === "membre").length,
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      // Here you would normally call your backend API to delete the user
      console.log("Deleting user:", userId)
      // For now, just show a message
      alert("User deletion would be implemented here")
    }
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!newMember.firstName || !newMember.lastName || !newMember.email || !newMember.password) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Here you would normally call your backend API to create the user
    console.log("Creating new member:", {
      name: `${newMember.firstName} ${newMember.lastName}`,
      email: newMember.email,
      role: newMember.role,
      department: newMember.department || undefined
    })
    
    // Reset form and close dialog
    setNewMember({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "membre",
      department: ""
    })
    setIsAddMemberOpen(false)
    alert("Membre ajouté avec succès!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Admin
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-purple-900">Gestion des Membres</h1>
          </div>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Membre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un Nouveau Membre</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={newMember.firstName}
                      onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}
                      placeholder="Prénom"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={newMember.lastName}
                      onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}
                      placeholder="Nom de famille"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="email@exemple.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newMember.password}
                    onChange={(e) => setNewMember({...newMember, password: e.target.value})}
                    placeholder="Mot de passe"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={newMember.role} onValueChange={(value: "admin" | "chef_departement" | "membre") => setNewMember({...newMember, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membre">Membre</SelectItem>
                      <SelectItem value="chef_departement">Chef de Département</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="department">Département (optionnel)</Label>
                  <Select value={newMember.department || "none"} onValueChange={(value) => setNewMember({...newMember, department: value === "none" ? "" : value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucun département</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="External Relations">External Relations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Ajouter
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddMemberOpen(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Membres</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
              <Crown className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.admins}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chefs Département</CardTitle>
              <UserCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.chefs}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membres</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.members}</div>
            </CardContent>
          </Card>
        </div>

        {/* Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Membres ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rôle</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Département</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Tâches Données</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Tâches Terminées</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Créé le</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-600 font-semibold text-sm">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{member.name}</p>
                            <p className="text-sm text-gray-500 truncate">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            member.role === "admin"
                              ? "default"
                              : member.role === "chef_departement"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {member.role === "admin" ? "Professeur" : 
                           member.role === "chef_departement" ? "Professeur" : 
                           "delegue"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">
                          {member.department || "Aucun département"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <ClipboardList className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold text-blue-600">
                            {getTasksGivenByUser(member.id)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <CheckSquare className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-green-600">
                            {getTasksDoneByUser(member.id)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {member.createdAt.toLocaleDateString('fr-FR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric' 
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2 justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedUser(member)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50 px-2"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Détails du Membre</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                  <p className="text-sm text-gray-600">{member.email}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Rôle:</span>
                                    <p className="text-gray-600">{member.role}</p>
                                  </div>
                                  {member.department && (
                                    <div>
                                      <span className="font-medium">Département:</span>
                                      <p className="text-gray-600">{member.department}</p>
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-medium">Tâches données:</span>
                                    <p className="text-blue-600 font-semibold">{getTasksGivenByUser(member.id)}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Tâches terminées:</span>
                                    <p className="text-green-600 font-semibold">{getTasksDoneByUser(member.id)}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Student ID:</span>
                                    <p className="text-gray-600">{member.studentId || "Non fourni"}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Telegram ID:</span>
                                    <p className="text-gray-600">{member.telegramId || "Non fourni"}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Discord ID:</span>
                                    <p className="text-gray-600">{member.discordId || "Non fourni"}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Créé le:</span>
                                    <p className="text-gray-600">{member.createdAt.toLocaleDateString('fr-FR')}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Dernière connexion:</span>
                                    <p className="text-gray-600">{member.lastLogin?.toLocaleDateString('fr-FR') || "Jamais"}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteUser(member.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50 px-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
