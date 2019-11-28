import axios from 'axios'
import { API_URI } from 'react-native-dotenv'

class Wowhead {
  async search(query: string, classic: boolean = false) {
    const {
      data: { results }
    } = await axios(
      `${API_URI}/api/search?query=${encodeURIComponent(
        query
      )}&classic=${classic}`
    )

    return results
  }

  async comments(type: string, id: number, classic: boolean = false) {
    const {
      data: { comments, title }
    } = await axios(
      `${API_URI}/api/comments?type=${type}&id=${id}&classic=${classic}`
    )

    return {
      comments,
      title
    }
  }
}

export const wowhead = new Wowhead()
