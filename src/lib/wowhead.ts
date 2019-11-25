import axios from 'axios'
import { orderBy } from 'lodash'

import { SearchResult } from '../types'

class Wowhead {
  async search(query: string, classic: boolean = false) {
    const { data } = await axios.get<string>(
      `https://${
        classic ? 'classic' : 'www'
      }.wowhead.com/search?q=${encodeURIComponent(query)}`
    )

    const lines = data.split('\n')

    const meta = lines
      .filter(line => line.includes('WH.Gatherer.addData'))
      .map(line => {
        const matches = line.match(/WH\.Gatherer\.addData\(\d, \d, (.*?)\);/)

        if (matches) {
          const [, data] = matches

          return JSON.parse(data)
        }
      })
      .filter(Boolean)
      .reduce((meta, data) => {
        Object.entries(data).forEach(([key, value]) => (meta[key] = value))

        return meta
      }, {})

    const results = lines
      .filter(line => line.includes('new Listview'))
      .map(line => {
        const matches = line.match(/id: '([a-z\-]+)'(.*?)data: \[(.*?)\]}\)/)

        if (matches) {
          const [, type, , data] = matches

          return {
            data: orderBy(
              JSON.parse(`[${data}]`),
              'searchpopularity',
              'desc'
            ).map(item => ({
              ...item,
              ...meta[item.id],
              name: item.name.replace('%s', '<Name>'),
              pieces: item.pieces && item.pieces.map((id: string) => meta[id]),
              reagents:
                item.reagents &&
                item.reagents.map(([id, quantity]: [number, number]) => ({
                  ...meta[id],
                  quantity
                }))
            })),
            type
          }
        }
      })
      .filter(Boolean) as SearchResult[]

    return orderBy(results, 'type', 'asc')
  }

  // async comments(type: string, id: number) {}
}

export const wowhead = new Wowhead()
