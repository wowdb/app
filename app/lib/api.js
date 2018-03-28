import { API_URI } from 'react-native-dotenv'

export default {
  async request(url) {
    const response = await fetch(API_URI + url)

    const { status } = response

    const json = await response.json()

    if (status >= 400) {
      const { message } = json

      throw new Error(message)
    }

    return json
  }
}
