import axios from 'axios'
import { API_URI } from 'react-native-dotenv'

class Wowhead {
  async search(query: string, classic: boolean = false) {
    const { data } = await axios(
      `${API_URI}/api/search?query=${encodeURIComponent(
        query
      )}&classic=${classic}`
    )

    return data
  }

  async comments(type: string, id: number, classic: boolean = false) {
    const { data } = await axios(
      `${API_URI}/api/comments?type=${type}&id=${id}&classic=${classic}`
    )

    return data
  }
}

export const wowhead = new Wowhead()
