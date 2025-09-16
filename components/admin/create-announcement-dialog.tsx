"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { createAnnouncement, type Announcement } from "@/lib/data"

interface CreateAnnouncementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingAnnouncement?: Announcement | null
  onEditComplete?: () => void
}

export default function CreateAnnouncementDialog({ 
  open, 
  onOpenChange, 
  editingAnnouncement, 
  onEditComplete 
}: CreateAnnouncementDialogProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    targetDepartment: undefined as string | undefined,
    isImportant: false,
  })

  useEffect(() => {
    if (editingAnnouncement) {
      setFormData({
        title: editingAnnouncement.title,
        content: editingAnnouncement.content,
        targetDepartment: editingAnnouncement.targetDepartment,  
        isImportant: editingAnnouncement.isImportant,
      })
    } else {
      setFormData({
        title: "",
        content: "",
        targetDepartment: undefined,
        isImportant: false,
      })
    }
  }, [editingAnnouncement])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (editingAnnouncement) {
      // In a real app, this would update the existing announcement
      console.log("Update announcement:", editingAnnouncement.id, formData)
      onEditComplete?.()
    } else {
      createAnnouncement({
        title: formData.title,
        content: formData.content,
        author: user.id,
        targetDepartment: formData.targetDepartment || undefined,
        isImportant: formData.isImportant,
      })
    }

    setFormData({
      title: "",
      content: "",
      targetDepartment: undefined,
      isImportant: false,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border text-foreground max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background border-border text-foreground"
              placeholder="Enter announcement title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-background border-border text-foreground min-h-[120px]"
              placeholder="Enter announcement content..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="department">Target Department</Label>
            <Select 
              value={formData.targetDepartment || "all"} 
              onValueChange={(value) => setFormData({ 
                ...formData, 
                targetDepartment: value === "all" ? undefined : value 
              })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select target department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Événementiel">Événementiel</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Extern">Extern</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="important"
              checked={formData.isImportant}
              onCheckedChange={(checked) => setFormData({ ...formData, isImportant: checked })}
            />
            <Label htmlFor="important" className="text-sm">
              Mark as important announcement
            </Label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {editingAnnouncement ? "Update Announcement" : "Create Announcement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
