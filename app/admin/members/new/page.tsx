"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createUser } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewMemberPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
  })

  if (!user || user.role !== "admin") {
    return <div>Access denied</div>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUser = createUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as "admin" | "chef departement" | "membre",
      department: formData.department || undefined,
    })

    if (newUser) {
      router.push("/admin/members")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/admin/members">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-purple-900">Créer un Nouveau Membre</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="chef departement">Chef de Département</SelectItem>
                    <SelectItem value="membre">Membre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.role === "chef departement" || formData.role === "membre") && (
                <div className="space-y-2">
                  <Label htmlFor="department">Département</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
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
              )}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Créer le Membre
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
