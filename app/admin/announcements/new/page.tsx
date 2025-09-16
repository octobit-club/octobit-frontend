"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createAnnouncement } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewAnnouncementPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    targetDepartment: "All", // Updated default value to "All"
    isImportant: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createAnnouncement({
      title: formData.title,
      content: formData.content,
      author: "1", // mock admin id
      targetDepartment: formData.targetDepartment || undefined,
      isImportant: formData.isImportant,
    })

    router.push("/admin/announcements")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/admin/announcements">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-purple-900">Créer une Nouvelle Annonce</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de l'annonce</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDepartment">Département cible</Label>
                <Select
                  value={formData.targetDepartment}
                  onValueChange={(value) => setFormData({ ...formData, targetDepartment: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les départements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Tous les départements</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isImportant"
                  checked={formData.isImportant}
                  onCheckedChange={(checked) => setFormData({ ...formData, isImportant: checked as boolean })}
                />
                <Label htmlFor="isImportant">Marquer comme important</Label>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Créer l'Annonce
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
