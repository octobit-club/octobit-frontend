"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllAnnouncements, getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, AlertTriangle, ArrowLeft, Trash2, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminAnnouncementsPage() {
  const announcements = getAllAnnouncements()
  const users = getAllUsers()
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    targetDepartment: "",
    isImportant: false
  })

  const getUserName = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId)
    return foundUser?.name || "Utilisateur inconnu"
  }

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce?")) {
      // Here you would normally call your backend API to delete the announcement
      console.log("Deleting announcement:", announcementId)
      // For now, just show a message
      alert("Suppression de l'annonce implémentée ici")
    }
  }

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert("Veuillez remplir le titre et le contenu")
      return
    }

    // Here you would normally call your backend API to create the announcement
    console.log("Creating new announcement:", {
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      targetDepartment: newAnnouncement.targetDepartment || undefined,
      isImportant: newAnnouncement.isImportant
    })
    
    // Reset form and close dialog
    setNewAnnouncement({
      title: "",
      content: "",
      targetDepartment: "",
      isImportant: false
    })
    setIsAddAnnouncementOpen(false)
    alert("Annonce ajoutée avec succès!")
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
            <h1 className="text-3xl font-bold text-purple-900">Gestion des Annonces</h1>
          </div>
          <Dialog open={isAddAnnouncementOpen} onOpenChange={setIsAddAnnouncementOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Annonce
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter une Nouvelle Annonce</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="Titre de l'annonce"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Contenu *</Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    placeholder="Contenu de l'annonce..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="department">Département Ciblé (optionnel)</Label>
                  <Select value={newAnnouncement.targetDepartment || "none"} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, targetDepartment: value === "none" ? "" : value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les départements" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tous les départements</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="External Relations">External Relations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="important"
                    checked={newAnnouncement.isImportant}
                    onCheckedChange={(checked) => setNewAnnouncement({...newAnnouncement, isImportant: !!checked})}
                  />
                  <Label htmlFor="important">Marquer comme important</Label>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Ajouter
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddAnnouncementOpen(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Announcements Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Liste des Annonces ({announcements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Titre</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Département</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Auteur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((announcement) => (
                    <tr key={announcement.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {announcement.isImportant && <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />}
                          <span className="font-medium text-gray-900 line-clamp-2">{announcement.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-gray-600 line-clamp-2 text-sm">{announcement.content}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant={announcement.isImportant ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {announcement.isImportant ? "Important" : "Normal"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {announcement.targetDepartment || "Tous"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {getUserName(announcement.author)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">
                          {announcement.createdAt.toLocaleDateString('fr-FR', { 
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
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
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
