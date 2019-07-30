import { capitalize, countBy, get, sortBy, toPairs, uniq } from 'lodash'
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
  Spinner,
  Text
} from '../components'
import Data from '../data'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

class Item extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle={navigation.getParam('subtitle', 'Item')}
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

    getObject('item', id)

    analytics.screen('Item', {
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

    const title = get(data, 'item.name')

    if (title) {
      const { itemClass } = get(data, 'item')

      setParams({
        title,
        subtitle: Data.itemClass(itemClass)
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
      item: {
        allowableClasses = [],
        allowableRaces = [],
        bonusStats = [],
        description,
        icon,
        itemBind,
        itemClass,
        itemLevel,
        socketInfo,
        stackable,
        itemSpells,
        itemSubClass,
        quality,
        requiredLevel,
        weaponInfo
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
                  Quality
                </Text>
                <Text style={styles.value} color={Colors.quality[quality]}>
                  {Data.quality(quality)}
                </Text>
              </Grid.Column>
              {itemBind > 0 && (
                <Grid.Column>
                  <Text style={styles.label} right semibold>
                    Binding
                  </Text>
                  <Text style={styles.value} right>
                    {Data.itemBind(itemBind)}
                  </Text>
                </Grid.Column>
              )}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Level
                </Text>
                <Text style={styles.value}>{itemLevel}</Text>
              </Grid.Column>
              {requiredLevel > 0 && (
                <Grid.Column>
                  <Text style={styles.label} right semibold>
                    Required level
                  </Text>
                  <Text style={styles.value} right>
                    {requiredLevel}
                  </Text>
                </Grid.Column>
              )}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Type
                </Text>
                <Text style={styles.value}>
                  {Data.itemClass(itemClass, itemSubClass)}
                </Text>
              </Grid.Column>
              {stackable > 1 && (
                <Grid.Column>
                  <Text style={styles.label} right semibold>
                    Stackable
                  </Text>
                  <Text style={styles.value} right>
                    {stackable}
                  </Text>
                </Grid.Column>
              )}
            </Grid.Row>

            {allowableClasses.length > 0 && (
              <View>
                <Text style={styles.label} semibold>
                  Classes
                </Text>
                <Text style={styles.value}>
                  {uniq(allowableClasses)
                    .map(id => Data.class(id))
                    .join(', ')}
                </Text>
              </View>
            )}
            {allowableRaces.length > 0 && (
              <View>
                <Text style={styles.label} semibold>
                  Races
                </Text>
                <Text style={styles.value}>
                  {uniq(allowableRaces)
                    .map(id => Data.race(id))
                    .join(', ')}
                </Text>
              </View>
            )}
            {weaponInfo && (
              <View>
                <Text style={styles.label} subtitle>
                  Weapon
                </Text>
                <Grid.Row>
                  <Grid.Column small>
                    <Text style={styles.label} semibold>
                      Damage
                    </Text>
                    <Text style={styles.value}>
                      {weaponInfo.damage.min}-{weaponInfo.damage.max}
                    </Text>
                  </Grid.Column>
                  <Grid.Column small>
                    <Text style={styles.label} center semibold>
                      DPS
                    </Text>
                    <Text style={styles.value} center>
                      {Math.round(weaponInfo.dps)}
                    </Text>
                  </Grid.Column>
                  <Grid.Column small>
                    <Text style={styles.label} right semibold>
                      Speed
                    </Text>
                    <Text style={styles.value} right>
                      {weaponInfo.weaponSpeed}
                    </Text>
                  </Grid.Column>
                </Grid.Row>
              </View>
            )}
            {bonusStats.length > 0 && (
              <View>
                <Text style={styles.label} subtitle>
                  Stats
                </Text>
                {sortBy(bonusStats, 'stat').map(({ amount, stat }) => (
                  <Text key={stat} style={styles.value} small>
                    +{amount} {Data.stat(stat)}
                  </Text>
                ))}
              </View>
            )}
            {itemSpells.length > 0 && (
              <View>
                <Text style={styles.label} subtitle>
                  Spells
                </Text>
                {sortBy(itemSpells, 'stat')
                  .filter(({ scaledDescription }) => scaledDescription)
                  .map(({ scaledDescription, spellId, trigger }) => (
                    <Text key={spellId} style={styles.value} small>
                      {Data.trigger(trigger)}: {scaledDescription}
                    </Text>
                  ))}
              </View>
            )}
            {socketInfo && (
              <View>
                <Text style={styles.label} subtitle>
                  Sockets
                </Text>
                {toPairs(
                  countBy(
                    socketInfo.sockets.map(({ type }) => capitalize(type))
                  )
                ).map(([type, count]) => (
                  <Text key={type} style={styles.value} small>
                    {count} &#215; {type}
                  </Text>
                ))}
                {socketInfo.socketBonus && (
                  <Text style={styles.value} small>
                    Bonus: {socketInfo.socketBonus}
                  </Text>
                )}
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
  data: get(objects, `item.${getParam('id')}`)
})

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
