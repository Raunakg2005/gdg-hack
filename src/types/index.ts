export type ItemStatus = 'lost' | 'found' | 'matched' | 'returned'

export interface Item {
  id: string
  type: 'lost' | 'found'
  status: ItemStatus
  title: string
  description: string
  category: string
  imageUrl?: string
  imageLabels?: string[]
  location: string
  date: Date
  userId: string
  userEmail: string
  userName: string
  contactInfo: string
  matchScore?: number
  potentialMatches?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Match {
  id: string
  lostItemId: string
  foundItemId: string
  score: number
  status: 'pending' | 'confirmed' | 'rejected'
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: Date
}

export interface VisionAnalysis {
  labels: string[]
  objects: string[]
  colors: string[]
  text?: string[]
}
