import { IconType } from '../types'

class Img {
  getUri(type: IconType, icon: string) {
    switch (type) {
      case 'faction':
        return `https://wow.zamimg.com/images/icons/${icon}.png`

      case 'follower':
        return `https://wow.zamimg.com/images/wow/garr/${icon}.png`

      default:
        return `https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`
    }
  }
}

export const img = new Img()
