"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllTasks, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CheckCircle, Clock, AlertCircle, ArrowLeft, Trash2, CheckSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminTasksPage() {
  const tasks = getAllTasks()
  const users = getAllUsers()
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    department: "",
    dueDate: ""
  })

  const getUserName = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId)
    return foundUser?.name || "Utilisateur inconnu"
  }

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche?")) {
      // Here you would normally call your backend API to delete the task
      console.log("Deleting task:", taskId)
      // For now, just show a message
      alert("Suppression de la tâche implémentée ici")
    }
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!newTask.title || !newTask.description || !newTask.assignedTo || !newTask.department || !newTask.dueDate) {
      alert("Veuillez remplir tous les champs")
      return
    }

    // Here you would normally call your backend API to create the task
    console.log("Creating new task:", {
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      department: newTask.department,
      dueDate: new Date(newTask.dueDate)
    })
    
    // Reset form and close dialog
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      department: "",
      dueDate: ""
    })
    setIsAddTaskOpen(false)
    alert("Tâche ajoutée avec succès!")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour Admin
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-purple-900">Gestion des Tâches</h1>
          </div>
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Tâche
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter une Nouvelle Tâche</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Titre de la tâche"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Description de la tâche..."
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="assignedTo">Assigné à *</Label>
                  <Select value={newTask.assignedTo} onValueChange={(value) => setNewTask({...newTask, assignedTo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un membre" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} - {user.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="department">Département *</Label>
                  <Select value={newTask.department} onValueChange={(value) => setNewTask({...newTask, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="External Relations">External Relations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Date d'échéance *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Ajouter
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddTaskOpen(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tasks Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-purple-600" />
              Liste des Tâches ({tasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Titre</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Donné par</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assigné à</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">État</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Échéance</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <span className="font-medium text-gray-900">{task.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-gray-600 line-clamp-2 text-sm">{task.description}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {getUserName(task.assignedBy)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {getUserName(task.assignedTo)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={`${getStatusColor(task.status)} text-xs`}>
                          {task.status === "completed" ? "Terminé" : 
                           task.status === "in-progress" ? "En cours" : "En attente"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {task.dueDate.toLocaleDateString('fr-FR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric' 
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
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
