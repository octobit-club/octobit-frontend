"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createTask, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewTaskPage() {
  const router = useRouter()
  const users = getAllUsers()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    department: "",
    dueDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createTask({
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      assignedBy: "1", // mock admin id
      department: formData.department,
      status: "pending",
      dueDate: new Date(formData.dueDate),
    })

    router.push("/admin/tasks")
  }

  const departmentMembers = users.filter((u) => u.department === formData.department)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/admin/tasks">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-purple-900">Créer une Nouvelle Tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la tâche</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Département</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value, assignedTo: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.department && (
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigner à</Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un membre" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="dueDate">Date d'échéance</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Créer la Tâche
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
