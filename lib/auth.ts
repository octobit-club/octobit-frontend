export type UserRole = "admin" | "chef_departement" | "membre"

export type Department = "IT" | "Événementiel" | "Social Media" | "Design" | "Extern"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department?: Department
  telegramId?: string
  discordId?: string
  studentId?: string
  createdAt: Date
  lastLogin?: Date
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Mock user data for demonstration (in production, this would come from a database)
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@octobit.com",
    name: "Admin Founder",
    role: "admin",
    telegramId: "@admin_founder",
    discordId: "AdminFounder#1234",
    studentId: "ADM001",
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "chef.it@octobit.com",
    name: "Chef IT",
    role: "chef_departement",
    department: "IT",
    telegramId: "@chef_it",
    discordId: "ChefIT#5678",
    studentId: "IT001",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "3",
    email: "chef.events@octobit.com",
    name: "Chef Événementiel",
    role: "chef_departement",
    department: "Événementiel",
    telegramId: "@chef_events",
    discordId: "ChefEvents#9012",
    studentId: "EVT001",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: "4",
    email: "member@octobit.com",
    name: "John Membre",
    role: "membre",
    department: "IT",
    telegramId: "@john_membre",
    discordId: "JohnMembre#3456",
    studentId: "ST2024001",
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(),
  },
]

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Mock authentication - in production, verify against database
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    // Mock password check
    return { ...user, lastLogin: new Date() }
  }
  return null
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userData = localStorage.getItem("octobit_user")
  return userData ? JSON.parse(userData) : null
}

export const setCurrentUser = (user: User | null) => {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("octobit_user", JSON.stringify(user))
  } else {
    localStorage.removeItem("octobit_user")
  }
}

export const hasRole = (user: User | null, roles: UserRole[]): boolean => {
  return user ? roles.includes(user.role) : false
}

export const canAccessDepartment = (user: User | null, department: Department): boolean => {
  if (!user) return false
  if (user.role === "admin") return true
  if (user.role === "chef_departement" && user.department === department) return true
  if (user.role === "membre" && user.department === department) return true
  return false
}

export const createUser = (userData: {
  email: string
  name: string
  role: UserRole
  department?: Department
  telegramId?: string
  discordId?: string
  studentId?: string
}): User => {
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    email: userData.email,
    name: userData.name,
    role: userData.role,
    department: userData.department,
    telegramId: userData.telegramId,
    discordId: userData.discordId,
    studentId: userData.studentId,
    createdAt: new Date(),
  }
  mockUsers.push(newUser)
  return newUser
}

export const getAllUsers = (): User[] => {
  return mockUsers
}

export const getUsersByDepartment = (department: Department): User[] => {
  return mockUsers.filter((user) => user.department === department)
}

export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const userIndex = mockUsers.findIndex((user) => user.id === userId)
  if (userIndex === -1) return null

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
  return mockUsers[userIndex]
}

export const deleteUser = (userId: string): boolean => {
  const userIndex = mockUsers.findIndex((user) => user.id === userId)
  if (userIndex === -1) return false

  mockUsers.splice(userIndex, 1)
  return true
}
