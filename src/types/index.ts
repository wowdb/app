import { ImageSourcePropType } from 'react-native'

export interface WowheadResult {
  description: string
  icon: string
  id: number
  level: string
  name: string
  namealliance: string
  namehorde: string
  pieces?: Piece[]
  points: number
  portraitalliance: string
  portraithorde: string
  quality: number
  reagents?: Reagent[]
}

export interface WowheadResults {
  template: string
  type: string
  data: WowheadResult[]
}

export interface WowheadComment {
  body: string
  comments?: WowheadComment[]
  date: string
  id: number
  rating: number
  user: string
}

export interface FactionSearchResult {
  icon: string
  name: string
}

export interface Piece {
  icon: string
}

export interface Reagent {
  icon: string
  quantity: number
}

export type IconType = 'default' | 'follower' | 'faction'

export type SortField = 'date' | 'rating'
export type SortOrder = 'asc' | 'desc'

export interface NavBarAction {
  icon: ImageSourcePropType
  onPress: () => void
}
