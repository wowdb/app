export interface WowheadResult {
  description?: string
  icon?: string
  id: number
  level?: string
  name?: string
  namealliance?: string
  namehorde?: string
  pieces?: number[]
  points?: string
  portraitalliance?: string
  portraithorde?: string
  quality?: string
  reagents?: string[]
}

export interface WowheadResults {
  template: string
  type: string
  data: WowheadResult[]
}

export interface WowheadComment {
  body: string
  date: string
  id: number
  rating: number
  replies?: WowheadComment[]
  user: string
}

export interface FactionSearchResult {
  icon: string
  name: string
}

export type IconType = 'default' | 'follower' | 'faction'

export type SortField = 'date' | 'rating'
export type SortOrder = 'asc' | 'desc'
