import { Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'

class Browser {
  async open(url: string) {
    const available = await InAppBrowser.isAvailable()

    if (available) {
      InAppBrowser.open(url)
    } else {
      Linking.openURL(url)
    }
  }
}

export const browser = new Browser()
