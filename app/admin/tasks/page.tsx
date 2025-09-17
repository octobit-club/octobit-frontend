"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllTasks, getAllUsers } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, Clock, AlertCircle, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminTasksPage() {
  const tasks = getAllTasks()
  const users = getAllUsers()

  const getUserName = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId)
    return foundUser?.name || "Utilisateur inconnu"
  }

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      // Here you would normally call your backend API to delete the task
      console.log("Deleting task:", taskId)
      // For now, just show a message
      alert("Task deletion would be implemented here")
    }
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
                Return to Admin
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-purple-900">Toutes les Tâches</h1>
          </div>
          <Link href="/admin/tasks/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Tâche
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(task.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        Assigné à: <strong>{getUserName(task.assignedTo)}</strong>
                      </span>
                      <span>
                        Département: <strong>{task.department}</strong>
                      </span>
                      <span>
                        Assigné par: <strong>{getUserName(task.assignedBy)}</strong>
                      </span>
                      <span>
                        Échéance: <strong>{task.dueDate.toLocaleDateString()}</strong>
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
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
