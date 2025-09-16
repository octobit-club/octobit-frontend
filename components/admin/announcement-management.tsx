"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Calendar, Users, Search, Plus, Edit, Trash2, AlertCircle, Filter, BarChart3, TrendingUp, Eye, Heart, Share } from "lucide-react"
import { getAllAnnouncements, type Announcement } from "@/lib/data"
import CreateAnnouncementDialog from "./create-announcement-dialog"

interface CreateAnnouncementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingAnnouncement?: Announcement | null
  onEditComplete?: () => void
}

export default function AnnouncementManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterImportance, setFilterImportance] = useState<string>("all")
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("all")
  
  const announcements = getAllAnnouncements()

  // Analytics data
  const announcementStats = {
    total: announcements.length,
    important: announcements.filter(a => a.isImportant).length,
    thisWeek: announcements.filter(a => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return a.createdAt >= weekAgo
    }).length,
    byDepartment: announcements.reduce((acc, ann) => {
      const dept = ann.targetDepartment || "All"
      acc[dept] = (acc[dept] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const getFilteredAnnouncements = (tabFilter: string = activeTab) => {
    return announcements
      .filter((announcement) => {
        const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDepartment = filterDepartment === "all" || 
                                 !announcement.targetDepartment || 
                                 announcement.targetDepartment === filterDepartment
        const matchesImportance = filterImportance === "all" ||
                                 (filterImportance === "important" && announcement.isImportant) ||
                                 (filterImportance === "normal" && !announcement.isImportant)
        
        const matchesTab = tabFilter === "all" ||
                          (tabFilter === "important" && announcement.isImportant) ||
                          (tabFilter === "recent" && (new Date().getTime() - announcement.createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000)
        
        return matchesSearch && matchesDepartment && matchesImportance && matchesTab
      })
      .sort((a, b) => {
        // First sort by importance (important ones first)
        if (a.isImportant && !b.isImportant) return -1
        if (!a.isImportant && b.isImportant) return 1
        
        // Then sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }

  const filteredAnnouncements = getFilteredAnnouncements()

  const getImportanceBadge = (isImportant: boolean) => {
    return isImportant 
      ? "bg-destructive text-destructive-foreground"
      : "bg-secondary text-secondary-foreground"
  }

  const handleDeleteAnnouncement = (id: string) => {
    // In a real app, this would call an API to delete the announcement
    console.log("Delete announcement:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Gestion des Communications
          </h2>
          <p className="text-muted-foreground">Créer et gérer les annonces du club</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground h-10">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Annonce
        </Button>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Annonces</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{announcementStats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Importantes</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{announcementStats.important}</div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cette Semaine</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{announcementStats.thisWeek}</div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Départements</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{Object.keys(announcementStats.byDepartment).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Toutes ({announcements.length})
          </TabsTrigger>
          <TabsTrigger value="important" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Importantes ({announcementStats.important})
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Récentes ({announcementStats.thisWeek})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Enhanced Filters */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Filter className="h-4 w-4 text-primary" />
                Filtres et Recherche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Rechercher dans les annonces..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
                
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Filtrer par département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les Départements</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Événementiel">Événementiel</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Extern">Extern</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterImportance} onValueChange={setFilterImportance}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Filtrer par importance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les Importances</SelectItem>
                    <SelectItem value="important">Importantes</SelectItem>
                    <SelectItem value="normal">Normales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Announcements Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
            {filteredAnnouncements.map((announcement, index) => (
              <Card key={announcement.id} className={`border-border hover:shadow-lg transition-all duration-300 group ${
                announcement.isImportant ? 'bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/30' : 'bg-card'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {announcement.isImportant && <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />}
                        <Badge className={`text-xs ${getImportanceBadge(announcement.isImportant)}`}>
                          {announcement.isImportant ? "🚨 Important" : "📝 Normal"}
                        </Badge>
                        <Badge variant="outline" className="border-border text-xs">
                          {announcement.targetDepartment || "Tous Départements"}
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground group-hover:text-primary transition-colors text-lg">
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      #{index + 1}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{announcement.content}</p>
                  
                  {/* Enhanced metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>📅 {announcement.createdAt.toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>👤 Auteur: {announcement.author}</span>
                    </div>
                  </div>

                  {/* Mock engagement metrics */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-primary" />
                        <span>{Math.floor(Math.random() * 100) + 20} vues</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-secondary" />
                        <span>{Math.floor(Math.random() * 15) + 2} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="h-3 w-3 text-accent" />
                        <span>{Math.floor(Math.random() * 5) + 1} partages</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingAnnouncement(announcement)}
                        className="border-border hover:bg-muted"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                    >
                      Voir détails →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredAnnouncements.length === 0 && (
            <Card className="border-border bg-card">
              <CardContent className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg mb-2">Aucune annonce trouvée</p>
                <p className="text-muted-foreground text-sm">Essayez de modifier vos filtres ou créez une nouvelle annonce</p>
                <Button 
                  onClick={() => setShowCreateDialog(true)} 
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une annonce
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <CreateAnnouncementDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        editingAnnouncement={editingAnnouncement}
        onEditComplete={() => setEditingAnnouncement(null)}
      />
    </div>
  )
}
