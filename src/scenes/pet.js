import { capitalize, get } from 'lodash'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { getObject } from '../actions'
import {
  Abilities,
  Comments,
  Grid,
  Icon,
  Main,
  NavBar,
  NotFound,
  Spinner,
  Text
} from '../components'
import Data from '../data'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

class Pet extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle="Pet"
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

    getObject('pet', id)

    analytics.screen('Pet', {
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

    const title = get(data, 'pet.name')

    if (title) {
      setParams({
        title
      })
    }
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
      pet: {
        abilities,
        canBattle,
        description,
        family,
        icon,
        source,
        strongAgainst,
        weakAgainst,
        stats: { petQualityId }
      }
    } = data

    return (
      <Main style={styles.main} scroll>
        <SafeAreaView>
          <View style={styles.content}>
            <View style={styles.header}>
              {Boolean(description) && (
                <View style={styles.description}>
                  <Text style={styles.label} semibold>
                    Description
                  </Text>
                  <Text style={styles.value} small>
                    {description}
                  </Text>
                </View>
              )}
              <Icon style={styles.icon} icon={icon} />
            </View>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Source
                </Text>
                <Text style={styles.value}>{source}</Text>
              </Grid.Column>
              <Grid.Column small>
                <Text style={styles.label} right semibold>
                  Family
                </Text>
                <Text style={styles.value} right>
                  {capitalize(family)}
                </Text>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Strong against
                </Text>
                {strongAgainst.map(family => (
                  <Text key={family} style={styles.value}>
                    {capitalize(family)}
                  </Text>
                ))}
              </Grid.Column>
              <Grid.Column>
                <Text style={styles.label} right semibold>
                  Weak against
                </Text>
                {weakAgainst.map(family => (
                  <Text key={family} style={styles.value} right>
                    {capitalize(family)}
                  </Text>
                ))}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Battle pet
                </Text>
                <Text style={styles.value}>{canBattle ? 'Yes' : 'No'}</Text>
              </Grid.Column>
              <Grid.Column>
                <Text style={styles.label} right semibold>
                  Quality
                </Text>
                <Text
                  style={styles.value}
                  color={Colors.quality[petQualityId]}
                  right
                >
                  {Data.quality(petQualityId)}
                </Text>
              </Grid.Column>
            </Grid.Row>
          </View>
          {abilities.length > 0 && <Abilities data={abilities} />}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  description: {
    flex: 1
  },
  icon: {
    marginLeft: Layout.margin,
    marginTop: Layout.margin
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
) => ({
  loading,
  data: get(objects, `pet.${getParam('id')}`)
})

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pet)
