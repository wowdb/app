import React, { Component } from 'react'

import Achievement from './achievement'
import Boss from './boss'
import Item from './item'
import Mount from './mount'
import Pet from './pet'
import Quest from './quest'
import Spell from './spell'
import Zone from './zone'

export default class Result extends Component {
  render() {
    const { type, onPress } = this.props

    switch (type) {
      case 'achievement':
        return <Achievement {...this.props} onPress={onPress} />

      case 'item':
        return <Item {...this.props} onPress={onPress} />

      case 'mount':
        return <Mount {...this.props} onPress={onPress} />

      case 'boss':
        return <Boss {...this.props} onPress={onPress} />

      case 'pet':
        return <Pet {...this.props} onPress={onPress} />

      case 'quest':
        return <Quest {...this.props} onPress={onPress} />

      case 'spell':
        return <Spell {...this.props} onPress={onPress} />

      case 'zone':
        return <Zone {...this.props} onPress={onPress} />

      default:
        return null
    }
  }
}
