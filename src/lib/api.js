import { API_URI } from 'react-native-dotenv'

export default class API {
  static async request(uri) {
    const response = await fetch(API_URI + uri)

    const { status } = response

    const json = await response.json()

    if (status >= 400) {
      const { message } = json

      throw new Error(message)
    }

    return json
  }
}
