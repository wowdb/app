import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { getObject } from '../actions'
import {
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

class Boss extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle="Boss"
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

    getObject('boss', id)

    analytics.screen('Boss', {
      id
    })
  }

  componentDidUpdate() {
    const {
      data,
      getObject,
      navigation: { getParam, setParams }
    } = this.props

    if (getParam('title')) {
      return
    }

    const zoneId = get(data, 'boss.zoneId')

    if (zoneId) {
      getObject('zone', zoneId)
    }

    const title = get(data, 'boss.name')

    if (title) {
      setParams({
        title
      })
    }
  }

  render() {
    const { data, zone, loading } = this.props

    if (loading) {
      return <Spinner full />
    }

    if (!data) {
      return <NotFound />
    }

    const {
      comments,
      boss: { description, level, npcs }
    } = data

    return (
      <Main style={styles.main} scroll>
        <SafeAreaView>
          <View style={styles.content}>
            {description && (
              <View>
                <Text style={styles.label} semibold>
                  Description
                </Text>
                <Text style={styles.value} small>
                  {description}
                </Text>
              </View>
            )}
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Location
                </Text>
                <Text style={styles.value}>{get(zone, 'zone.name')}</Text>
              </Grid.Column>
              <Grid.Column small>
                <Text style={styles.label} semibold right>
                  Level
                </Text>
                <Text style={styles.value} right>
                  {level}
                </Text>
              </Grid.Column>
            </Grid.Row>
            {npcs.length > 1 && (
              <View>
                <Text style={styles.label} semibold>
                  NPCs
                </Text>
                {npcs.map(({ id, name }) => (
                  <Text key={id} style={styles.value}>
                    {name}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <Comments data={comments} />
        </SafeAreaView>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background
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
  }
})

const mapStateToProps = (
  { objects: { objects, loading } },
  { navigation: { getParam } }
) => {
  const id = getParam('id')

  const data = get(objects, `boss.${id}`)

  let zone

  const zoneId = get(data, 'boss.zoneId')

  if (zoneId) {
    zone = get(objects, `zone.${zoneId}`)
  }

  return {
    data,
    loading,
    zone
  }
}

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boss)
