import axios from 'axios'

class Wowhead {
  async search(query: string, classic: boolean = false) {
    const { data } = await axios(
      `https://wowdb.alizahid.now.sh/api/search?query=${encodeURIComponent(
        query
      )}&classic=${classic}`
    )

    return data
  }
}

export const wowhead = new Wowhead()
