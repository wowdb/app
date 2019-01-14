import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { getObject } from '../actions'
import {
  Bosses,
  Comments,
  Grid,
  Main,
  NavBar,
  NotFound,
  Spinner,
  Text
} from '../components'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'
import Data from '../data'

class Zone extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle={navigation.getParam('subtitle', 'Zone')}
        title={navigation.getParam('title', 'Loading')}
      />
    )
  })

  componentDidMount() {
    const {
      getObject,
      navigation: { getParam }
    } = this.props

    const id = getParam('id')

    getObject('zone', id)

    analytics.screen('Zone', {
      id
    })
  }

  componentDidUpdate() {
    const {
      data,
      navigation: { getParam, setParams }
    } = this.props

    if (getParam('title')) {
      return
    }

    const title = get(data, 'zone.name')

    if (title) {
      setParams({
        title,
        subtitle: this.zoneType
      })
    }
  }

  get zoneType() {
    const { data } = this.props

    const isRaid = get(data, 'zone.isRaid')

    if (isRaid) {
      return 'Raid'
    } else {
      return 'Dungeon'
    }
  }

  get normalLevel() {
    const { data } = this.props

    const { advisedMaxLevel, advisedMinLevel } = get(data, 'zone', {})

    if (advisedMinLevel === advisedMaxLevel) {
      return advisedMinLevel
    }

    return `${advisedMinLevel}-${advisedMaxLevel}`
  }

  get heroicLevel() {
    const { data } = this.props

    const { advisedHeroicMaxLevel, advisedHeroicMinLevel } = get(
      data,
      'zone',
      {}
    )

    if (advisedHeroicMinLevel === advisedHeroicMaxLevel) {
      return advisedHeroicMinLevel
    }

    return [advisedHeroicMinLevel, advisedHeroicMaxLevel].join('-')
  }

  get heroicLevel() {
    const { data } = this.props

    const { advisedHeroicMaxLevel, advisedHeroicMinLevel } = get(
      data,
      'zone',
      {}
    )

    if (advisedHeroicMinLevel === advisedHeroicMaxLevel) {
      return advisedHeroicMinLevel
    }

    return [advisedHeroicMinLevel, advisedHeroicMaxLevel].join('-')
  }

  render() {
    const { data, loading } = this.props

    if (loading) {
      return <Spinner full />
    }

    if (!data) {
      return <NotFound />
    }

    const {
      comments,
      zone: {
        advisedMinLevel,
        availableModes,
        bosses,
        description,
        expansionId,
        isDungeon,
        isRaid,
        location,
        patch
      }
    } = data

    return (
      <Main style={styles.main} scroll>
        <SafeAreaView>
          <View style={styles.content}>
            {Boolean(description) && (
              <View>
                <Text style={styles.label} semibold>
                  Description
                </Text>
                <Text style={styles.value} small>
                  {description}
                </Text>
              </View>
            )}
            <Text style={styles.label} semibold>
              Location
            </Text>
            <Text style={styles.value}>{location.name}</Text>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Type
                </Text>
                <Text style={styles.value}>{this.zoneType}</Text>
              </Grid.Column>
              <Grid.Column>
                <Text style={styles.label} semibold right>
                  Required level
                </Text>
                <Text style={styles.value} right>
                  {advisedMinLevel}
                </Text>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Expansion
                </Text>
                <Text style={styles.value}>{Data.expansion(expansionId)}</Text>
              </Grid.Column>
              <Grid.Column small>
                <Text style={styles.label} semibold right>
                  Patch
                </Text>
                <Text style={styles.value} right>
                  {patch}
                </Text>
              </Grid.Column>
            </Grid.Row>
            {isDungeon && (
              <Grid.Row>
                <Grid.Column>
                  <Text style={styles.label} semibold>
                    Level for normal
                  </Text>
                  <Text style={styles.value}>{this.normalLevel}</Text>
                </Grid.Column>
                <Grid.Column small>
                  <Text style={styles.label} semibold right>
                    Level for heroic
                  </Text>
                  <Text style={styles.value} right>
                    {this.heroicLevel}
                  </Text>
                </Grid.Column>
              </Grid.Row>
            )}
            {isRaid && availableModes.length > 0 && (
              <View>
                <Text style={styles.label} semibold>
                  Modes
                </Text>
                <Text style={styles.value}>{Data.modes(availableModes)}</Text>
              </View>
            )}
          </View>
          <Bosses style={styles.bosses} data={bosses} />
          <Comments style={styles.comments} data={comments} />
        </SafeAreaView>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primaryDark
  },
  content: {
    backgroundColor: Colors.primaryDark,
    padding: Layout.margin,
    paddingTop: 0
  },
  label: {
    color: Colors.accent,
    marginTop: Layout.margin
  },
  value: {
    marginTop: Layout.padding
  },
  bosses: {
    backgroundColor: Colors.background
  },
  comments: {
    backgroundColor: Colors.primaryDark
  }
})

const mapStateToProps = (
  { objects: { objects, loading } },
  { navigation: { getParam } }
) => ({
  loading,
  data: get(objects, `zone.${getParam('id')}`)
})

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zone)
