"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, MessageSquare, Calendar, LogOut, AlertCircle, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getAllAnnouncements } from "@/lib/data"
import SharedHeader from "@/components/shared-header"
import UserManagement from "./user-management"
import AnnouncementManagement from "./announcement-management"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { logout } = useAuth()
  
  // Get real data
  const allAnnouncements = getAllAnnouncements()
  
  // Mock data for now - you can connect to real data later
  const users = [
    { id: 1, name: "Alice Johnson", role: "membre", department: "IT" },
    { id: 2, name: "Bob Smith", role: "chef", department: "Design" },
    { id: 3, name: "Carol Williams", role: "membre", department: "Events" },
  ]
  
  const tasks = [
    { id: 1, title: "Update website", status: "pending" },
    { id: 2, title: "Organize workshop", status: "in-progress" },
  ]

  // Sort announcements to show important and recent ones first
  const recentAnnouncements = allAnnouncements
    .sort((a, b) => {
      // First sort by importance (important ones first)
      if (a.isImportant && !b.isImportant) return -1
      if (!a.isImportant && b.isImportant) return 1
      
      // Then sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    .slice(0, 3) // Show only top 3 announcements

  const stats = {
    totalMembers: users.length,
    totalTasks: tasks.length,
    totalAnnouncements: allAnnouncements.length,
    departmentHeads: users.filter((u) => u.role === "chef").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Club Management</h2>
              <p className="text-muted-foreground">Manage all club operations and members</p>
            </div>
            <Button
              variant="outline"
              onClick={logout}
              className="border-border hover:bg-muted flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          {activeTab === "overview" && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.totalMembers}</div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Department Heads</CardTitle>
                    <UserPlus className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.departmentHeads}</div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
                    <Calendar className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.totalTasks}</div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Announcements</CardTitle>
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stats.totalAnnouncements}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Announcements - Full width under statistics */}
              <Card className="border-border bg-card mb-8">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Recent Announcements
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("announcements")}
                      className="border-border hover:bg-muted"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Manage All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentAnnouncements.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {recentAnnouncements.map((announcement) => (
                        <div key={announcement.id} className="p-4 border border-border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            {announcement.isImportant && <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                            <h4 className="font-semibold text-foreground text-sm">{announcement.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={announcement.isImportant ? "bg-destructive text-destructive-foreground text-xs" : "bg-secondary text-secondary-foreground text-xs"}>
                              {announcement.isImportant ? "Important" : "Normal"}
                            </Badge>
                            <Badge variant="outline" className="border-border text-xs">
                              {announcement.targetDepartment || "All Departments"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{announcement.content}</p>
                          <div className="text-xs text-muted-foreground">
                            📅 {announcement.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No announcements yet</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setActiveTab("announcements")}
                      >
                        Create First Announcement
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4 mb-8">
                <Button
                  variant={activeTab === "overview" ? "default" : "outline"}
                  onClick={() => setActiveTab("overview")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Overview
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("users")}
                  className="border-border hover:bg-muted"
                >
                  User Management
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("announcements")}
                  className="border-border hover:bg-muted"
                >
                  Announcements
                </Button>
              </div>
            </>
          )}

          {activeTab === "users" && <UserManagement />}
          {activeTab === "announcements" && <AnnouncementManagement />}
        </div>
      </div>
    </div>
  )
}
