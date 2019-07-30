import { get } from 'lodash'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { getObject } from '../actions'
import {
  Comments,
  Grid,
  Icon,
  Main,
  NavBar,
  NotFound,
  Result,
  Spinner,
  Text
} from '../components'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

class Achievement extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle="Achievement"
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

    getObject('achievement', id)

    analytics.screen('Achievement', {
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

    const title = get(data, 'achievement.title')

    if (title) {
      setParams({
        title
      })
    }
  }

  get faction() {
    const { data } = this.props

    const factionId = get(data, 'achievement.factionId')

    switch (factionId) {
      case 0:
        return 'Alliance'

      case 1:
        return 'Horde'

      case 2:
        return 'Both'

      default:
        return 'Unknown'
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
      achievement: {
        accountWide,
        description,
        icon,
        points,
        reward,
        rewardItems
      }
    } = data

    return (
      <Main style={styles.main} scroll>
        <SafeAreaView>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.description}>
                <Text style={styles.label} semibold>
                  Description
                </Text>
                <Text style={styles.value} small>
                  {description}
                </Text>
              </View>
              <Icon style={styles.icon} icon={icon} />
            </View>
            <Grid.Row>
              <Grid.Column small>
                <Text style={styles.label} semibold>
                  Account-wide
                </Text>
                <Text style={styles.value}>{accountWide ? 'Yes' : 'No'}</Text>
              </Grid.Column>
              {points > 0 && (
                <Grid.Column small>
                  <Text style={styles.label} center semibold>
                    Points
                  </Text>
                  <Text style={styles.value} center>
                    {points}
                  </Text>
                </Grid.Column>
              )}
              <Grid.Column small>
                <Text style={styles.label} semibold right>
                  Faction
                </Text>
                <Text style={styles.value} right>
                  {this.faction}
                </Text>
              </Grid.Column>
            </Grid.Row>
            {rewardItems.length === 0 && reward && (
              <View>
                <Text style={styles.label} semibold>
                  Reward
                </Text>
                <Text style={styles.value}>{reward}</Text>
              </View>
            )}
          </View>
          {rewardItems.length > 0 && (
            <View style={styles.reward}>
              <Text style={[styles.label, styles.rewards]} subtitle>
                Rewards
              </Text>
              {rewardItems.map(reward => (
                <Result key={reward.id} type="item" {...reward} />
              ))}
            </View>
          )}
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
    flexDirection: 'row'
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
  },
  reward: {
    backgroundColor: Colors.primaryDark
  },
  rewards: {
    marginHorizontal: Layout.margin
  }
})

const mapStateToProps = (
  { objects: { objects, loading } },
  { navigation: { getParam } }
) => ({
  loading,
  data: get(objects, `achievement.${getParam('id')}`)
})

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Achievement)
