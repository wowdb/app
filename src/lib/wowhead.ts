import axios from 'axios'

class Wowhead {
  uri = __DEV__ ? 'http://localhost:3000' : 'https://wowdb.alizahid.now.sh'

  async search(query: string, classic: boolean = false) {
    const { data } = await axios(
      `${this.uri}/api/search?query=${encodeURIComponent(
        query
      )}&classic=${classic}`
    )

    return data
  }

  async comments(type: string, id: number, classic: boolean = false) {
    const { data } = await axios(
      `${this.uri}/api/comments?type=${type}&id=${id}&classic=${classic}`
    )

    return data
  }
}

export const wowhead = new Wowhead()
