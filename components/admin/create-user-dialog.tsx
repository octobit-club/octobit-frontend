"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUser } from "@/lib/auth"

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "membre" as "membre" | "chef_departement",
    telegramId: "",
    discordId: "",
    studentId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department as any,
      telegramId: formData.telegramId || undefined,
      discordId: formData.discordId || undefined,
      studentId: formData.studentId || undefined,
    })
    
    setFormData({
      name: "",
      email: "",
      department: "",
      role: "membre",
      telegramId: "",
      discordId: "",
      studentId: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border text-foreground max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border text-foreground"
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border text-foreground"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="bg-background border-border text-foreground"
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Événementiel">Événementiel</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Extern">Extern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telegramId">Telegram ID</Label>
              <Input
                id="telegramId"
                value={formData.telegramId}
                onChange={(e) => setFormData({ ...formData, telegramId: e.target.value })}
                className="bg-background border-border text-foreground"
                placeholder="@username"
              />
            </div>
            <div>
              <Label htmlFor="discordId">Discord ID</Label>
              <Input
                id="discordId"
                value={formData.discordId}
                onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                className="bg-background border-border text-foreground"
                placeholder="Username#1234"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "membre" | "chef_departement") => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="membre">Member</SelectItem>
                <SelectItem value="chef_departement">Department Head</SelectItem>
              </SelectContent>
            </Select>
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
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
