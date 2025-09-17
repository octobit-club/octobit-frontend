"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, Mail, Phone, MessageCircle, Hash } from "lucide-react"
import { usersAPI } from "@/lib/api"
import CreateUserDialog from "./create-user-dialog"

interface User {
  id: string
  name: string
  email: string
  role: string
  department?: string
  telegramId?: string
  discordId?: string
  studentId?: string
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load users from backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true)
        const response = await usersAPI.getAll()
        const data = response.data || []
        // Transform the data to match our interface
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: item.full_name || item.name || 'Unknown',
          email: item.email,
          role: item.role,
          department: item.department,
          telegramId: item.telegram_id,
          discordId: item.discord_id,
          studentId: item.student_id
        }))
        setUsers(transformedData)
      } catch (error) {
        console.error('Failed to load users:', error)
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filteredUsers = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-destructive text-destructive-foreground"
      case "chef":
        return "bg-primary text-primary-foreground"
      case "member":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted animate-pulse rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 w-32 bg-muted animate-pulse rounded mb-2"></div>
                      <div className="h-4 w-24 bg-muted animate-pulse rounded mb-3"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="h-4 w-40 bg-muted animate-pulse rounded"></div>
                        <div className="h-4 w-36 bg-muted animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredUsers.map((user: User) => (
          <Card key={user.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                    <p className="text-muted-foreground">{user.department || "No department"}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-primary" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-3 w-3 text-primary" />
                        <span>{user.telegramId || "No Telegram"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-3 w-3 text-primary" />
                        <span>{user.discordId || "No Discord"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-primary" />
                        <span>{user.studentId || "No Student ID"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      <CreateUserDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
