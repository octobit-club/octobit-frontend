"use client"

import { useAuth } from "@/contexts/auth-context"
import { getAllUsers } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck } from "lucide-react"

export default function ChefMembersPage() {
  const allUsers: import("@/lib/auth").User[] = getAllUsers()
  const user: import("@/lib/auth").User = { id: "2", name: "Chef IT", department: "IT", role: "chef_departement", email: "chef.it@octobit.com", createdAt: new Date() }

  const departmentMembers = allUsers.filter((u) => u.department === user.department)
  const members = departmentMembers.filter((u) => u.role === "membre")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-900">Membres - Département {user.department}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Membres du Département</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{departmentMembers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membres Actifs</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{members.length}</div>
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
              {departmentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">{member.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-sm text-gray-500">Département: {member.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={member.role === "chef_departement" ? "default" : "outline"}>{member.role}</Badge>
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
