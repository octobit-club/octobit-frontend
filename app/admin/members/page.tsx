"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllUsers } from "@/lib/data"
import type { User } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Users, UserCheck, Crown, ArrowLeft, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminMembersPage() {
  const users: User[] = getAllUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

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
          <Link href="/admin/members/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Membre
            </Button>
          </Link>
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
            <CardTitle>Liste des Membres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">{member.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      {member.department && <p className="text-sm text-gray-500">Département: {member.department}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        member.role === "admin"
                          ? "default"
                          : member.role === "chef_departement"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {member.role}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedUser(member)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Member Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Role:</span>
                              <p className="text-gray-600">{member.role}</p>
                            </div>
                            {member.department && (
                              <div>
                                <span className="font-medium">Department:</span>
                                <p className="text-gray-600">{member.department}</p>
                              </div>
                            )}
                            <div>
                              <span className="font-medium">Student ID:</span>
                              <p className="text-gray-600">{member.studentId || "Not provided"}</p>
                            </div>
                            <div>
                              <span className="font-medium">Telegram ID:</span>
                              <p className="text-gray-600">{member.telegramId || "Not provided"}</p>
                            </div>
                            <div>
                              <span className="font-medium">Discord ID:</span>
                              <p className="text-gray-600">{member.discordId || "Not provided"}</p>
                            </div>
                            <div>
                              <span className="font-medium">Created At:</span>
                              <p className="text-gray-600">{member.createdAt.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Last Login:</span>
                              <p className="text-gray-600">{member.lastLogin?.toLocaleDateString() || "Never"}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteUser(member.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
