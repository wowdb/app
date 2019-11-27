import axios from 'axios'

class Wowhead {
  async search(query: string, classic: boolean = false) {
    const { data } = await axios(
      `http://localhost:3000/api/search?query=${encodeURIComponent(
        query
      )}&classic=${classic}`
    )

    return data
  }

  async comments(type: string, id: number, classic: boolean = false) {
    const { data } = await axios(
      `http://localhost:3000/api/comments?type=${type}&id=${id}&classic=${classic}`
    )

    return data
  }
}

export const wowhead = new Wowhead()
