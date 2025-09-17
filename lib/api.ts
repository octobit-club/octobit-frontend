// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// API Response Types
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  details?: Array<{
    field: string
    message: string
  }>
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const finalOptions = { ...defaultOptions, ...options }

  try {
    const response = await fetch(url, finalOptions)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

// API Functions

// Join Club API
export const joinClubAPI = {
  // Submit join application
  submit: async (applicationData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    telegramId?: string
    discordId?: string
    homeAddress?: string
    academicYear: string
    fieldOfStudy: string
    preferredDepartment: string
    secondaryDepartment?: string
    skills?: string
    motivation: string
  }) => {
    return apiRequest('/api/join', {
      method: 'POST',
      body: JSON.stringify(applicationData)
    })
  },

  // Get all applications (Admin)
  getAll: async (params: {
    status?: 'pending' | 'approved' | 'rejected'
    page?: number
    limit?: number
  } = {}) => {
    const searchParams = new URLSearchParams()
    if (params.status) searchParams.append('status', params.status)
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/join?${queryString}` : '/api/join'
    
    return apiRequest(endpoint)
  },

  // Get single application
  getById: async (id: string) => {
    return apiRequest(`/api/join/${id}`)
  },

  // Update application status
  updateStatus: async (id: string, status: 'pending' | 'approved' | 'rejected', reviewedBy?: string) => {
    return apiRequest(`/api/join/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, reviewedBy })
    })
  }
}

// Events API
export const eventsAPI = {
  // Get all events
  getAll: async (params: {
    status?: 'draft' | 'active' | 'completed' | 'cancelled'
    active?: boolean
    department?: string
    upcoming?: boolean
    page?: number
    limit?: number
  } = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/events?${queryString}` : '/api/events'
    
    return apiRequest(endpoint)
  },

  // Get single event
  getById: async (id: string) => {
    return apiRequest(`/api/events/${id}`)
  },

  // Create event
  create: async (eventData: {
    title: string
    description: string
    eventDate: string
    eventTime: string
    location: string
    maxAttendees?: number
    category: string
    difficulty?: string
    imageUrl?: string
    department?: string
    createdBy?: string
  }) => {
    return apiRequest('/api/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    })
  },

  // Update event
  update: async (id: string, eventData: any) => {
    return apiRequest(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    })
  },

  // Delete event
  delete: async (id: string) => {
    return apiRequest(`/api/events/${id}`, {
      method: 'DELETE'
    })
  },

  // Register for event
  register: async (eventId: string, userId: string) => {
    return apiRequest(`/api/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    })
  },

  // Get event registrations
  getRegistrations: async (eventId: string) => {
    return apiRequest(`/api/events/${eventId}/registrations`)
  }
}

// Users API
export const usersAPI = {
  // Get all users
  getAll: async (params: {
    role?: 'admin' | 'chef_departement' | 'membre'
    department?: string
    active?: boolean
    page?: number
    limit?: number
  } = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/users?${queryString}` : '/api/users'
    
    return apiRequest(endpoint)
  },

  // Get single user
  getById: async (id: string) => {
    return apiRequest(`/api/users/${id}`)
  },

  // Create user
  create: async (userData: {
    email: string
    password: string
    firstName?: string
    lastName?: string
    role?: string
    department?: string
  }) => {
    return apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  },

  // Create admin user (quick setup)
  createAdmin: async () => {
    return apiRequest('/api/users/create-admin', {
      method: 'POST'
    })
  },

  // Update user
  update: async (id: string, userData: any) => {
    return apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }
}

// Tasks API
export const tasksAPI = {
  // Get all tasks
  getAll: async (params: {
    assignedTo?: string
    assignedBy?: string
    status?: 'pending' | 'in-progress' | 'completed'
    priority?: 'low' | 'medium' | 'high'
    department?: string
    page?: number
    limit?: number
  } = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/tasks?${queryString}` : '/api/tasks'
    
    return apiRequest(endpoint)
  },

  // Get single task
  getById: async (id: string) => {
    return apiRequest(`/api/tasks/${id}`)
  },

  // Create task
  create: async (taskData: {
    title: string
    description: string
    assignedTo: string
    priority?: 'low' | 'medium' | 'high'
    dueDate?: string
    category?: string
    department?: string
    assignedBy?: string
  }) => {
    return apiRequest('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    })
  },

  // Update task
  update: async (id: string, taskData: any) => {
    return apiRequest(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData)
    })
  },

  // Delete task
  delete: async (id: string) => {
    return apiRequest(`/api/tasks/${id}`, {
      method: 'DELETE'
    })
  }
}

// Announcements API
export const announcementsAPI = {
  // Get all announcements
  getAll: async (params: {
    category?: string
    important?: boolean
    targetAudience?: 'all' | 'department' | 'admins'
    department?: string
    page?: number
    limit?: number
  } = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/api/announcements?${queryString}` : '/api/announcements'
    
    return apiRequest(endpoint)
  },

  // Get single announcement
  getById: async (id: string) => {
    return apiRequest(`/api/announcements/${id}`)
  },

  // Create announcement
  create: async (announcementData: {
    title: string
    content: string
    category: string
    isImportant?: boolean
    targetAudience?: 'all' | 'department' | 'admins'
    targetDepartment?: string
    authorId?: string
  }) => {
    return apiRequest('/api/announcements', {
      method: 'POST',
      body: JSON.stringify(announcementData)
    })
  },

  // Update announcement
  update: async (id: string, announcementData: any) => {
    return apiRequest(`/api/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(announcementData)
    })
  },

  // Delete announcement
  delete: async (id: string) => {
    return apiRequest(`/api/announcements/${id}`, {
      method: 'DELETE'
    })
  }
}

// Health check
export const healthAPI = {
  check: async () => {
    return apiRequest('/health')
  }
}

export default {
  joinClubAPI,
  eventsAPI,
  usersAPI,
  tasksAPI,
  announcementsAPI,
  healthAPI
}