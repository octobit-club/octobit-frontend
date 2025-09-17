"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllAnnouncements, getAllUsers } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminAnnouncementsPage() {
  const announcements = getAllAnnouncements()
  const users = getAllUsers()

  const getUserName = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId)
    return foundUser?.name || "Utilisateur inconnu"
  }

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      // Here you would normally call your backend API to delete the announcement
      console.log("Deleting announcement:", announcementId)
      // For now, just show a message
      alert("Announcement deletion would be implemented here")
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
            <h1 className="text-3xl font-bold text-purple-900">Toutes les Annonces</h1>
          </div>
          <Link href="/admin/announcements/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Annonce
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={announcement.isImportant ? "border-yellow-400" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {announcement.isImportant && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                    {announcement.isImportant && <Badge className="bg-yellow-100 text-yellow-800">Important</Badge>}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">{announcement.content}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>
                      Par: <strong>{getUserName(announcement.author)}</strong>
                    </span>
                    <span>
                      Cible: <strong>{announcement.targetDepartment || "Tous les départements"}</strong>
                    </span>
                  </div>
                  <span>{announcement.createdAt.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
