export interface SearchResult {
  type: string
  data: {
    name: string
    icon: string
    description: string
  }[]
}

export interface FactionSearchResult {
  icon: string
  name: string
}

export type IconType = 'default' | 'follower' | 'faction'
