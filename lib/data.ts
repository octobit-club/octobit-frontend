export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string // user id
  assignedBy: string // user id
  department: string
  status: "pending" | "in-progress" | "completed"
  dueDate: Date
  createdAt: Date
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string // user id
  targetDepartment?: string // if undefined, it's for all departments
  createdAt: Date
  isImportant: boolean
}

// Mock data
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Prepare Workshop Materials",
    description: "Prepare slides and code examples for the AI workshop",
    assignedTo: "4",
    assignedBy: "2",
    department: "IT",
    status: "pending",
    dueDate: new Date("2024-12-20"),
    createdAt: new Date("2024-12-10"),
  },
]

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Welcome to Octobit!",
    content: "Welcome to our scientific club. We're excited to have you on board!",
    author: "1",
    createdAt: new Date("2024-12-01"),
    isImportant: true,
  },
  {
    id: "2",
    title: "IT Department Meeting",
    content: "Monthly IT department meeting scheduled for next Friday at 2 PM.",
    author: "2",
    targetDepartment: "IT",
    createdAt: new Date("2024-12-05"),
    isImportant: false,
  },
]

import type { User } from "@/lib/auth"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@octobit.com",
    role: "admin",
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@octobit.com",
    role: "chef_departement",
    department: "IT",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "3",
    name: "Charlie",
    email: "charlie@octobit.com",
    role: "chef_departement",
    department: "Design",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "4",
    name: "David",
    email: "david@octobit.com",
    role: "membre",
    department: "IT",
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(),
  },
]

export const createTask = (taskData: Omit<Task, "id" | "createdAt">): Task => {
  const newTask: Task = {
    ...taskData,
    id: (mockTasks.length + 1).toString(),
    createdAt: new Date(),
  }
  mockTasks.push(newTask)
  return newTask
}

export const createAnnouncement = (announcementData: Omit<Announcement, "id" | "createdAt">): Announcement => {
  const newAnnouncement: Announcement = {
    ...announcementData,
    id: (mockAnnouncements.length + 1).toString(),
    createdAt: new Date(),
  }
  mockAnnouncements.push(newAnnouncement)
  return newAnnouncement
}

export const getTasksForUser = (userId: string): Task[] => {
  return mockTasks.filter((task) => task.assignedTo === userId)
}

export const getAnnouncementsForUser = (userId: string, department?: string): Announcement[] => {
  return mockAnnouncements.filter(
    (announcement) => !announcement.targetDepartment || announcement.targetDepartment === department,
  )
}

export const updateTaskStatus = (taskId: string, status: Task["status"]): Task | null => {
  const taskIndex = mockTasks.findIndex((task) => task.id === taskId)
  if (taskIndex === -1) return null

  mockTasks[taskIndex].status = status
  return mockTasks[taskIndex]
}

export const getAllUsers = () => {
  return mockUsers
}

export const getTasksByDepartment = (department: string): Task[] => {
  return mockTasks.filter((task) => task.department === department)
}

export const getAnnouncementsByDepartment = (department: string): Announcement[] => {
  return mockAnnouncements.filter(
    (announcement) => announcement.targetDepartment === department || !announcement.targetDepartment,
  )
}

export const getAllTasks = (): Task[] => {
  return mockTasks
}

export const getAllAnnouncements = (): Announcement[] => {
  return mockAnnouncements
}
