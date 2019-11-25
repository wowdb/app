import { TextStyle } from 'react-native'
import { human, iOSColors, systemWeights } from 'react-native-typography'

export const colors = {
  ...iOSColors,

  accent: '#f4bf2a',
  border: 'rgba(0, 0, 0, 0.25)',
  primary: '#2b374c',
  secondary: '#121e33'
}

export const fonts = {
  body: {
    ...human.bodyObject,
    color: iOSColors.white
  },
  subtitle: {
    ...human.title2Object,
    color: iOSColors.white
  },
  title: {
    ...human.largeTitleObject,
    color: iOSColors.white
  }
}

export const fontWeights = {
  ...systemWeights
}

export const layout = {
  border: {
    radius: 4
  },
  margin: 20,
  padding: 10
}

export const quality = (quality?: number) => {
  switch (quality) {
    case 0:
      return '#9d9d9d'

    case 1:
      return '#fff'

    case 2:
      return '#1eff00'

    case 3:
      return '#0070dd'

    case 4:
      return '#a335ee'

    case 5:
      return '#ff8000'

    case 6:
      return '#e5cc80'

    case 7:
      return '#0cf'

    case undefined:
      return '#f4bf2a'
  }
}

export const textShadow: TextStyle = {
  textShadowColor: 'black',
  textShadowOffset: {
    height: 0,
    width: 0
  },
  textShadowRadius: 5
}
