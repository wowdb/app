import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'

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
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

class Spell extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle="Spell"
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

    getObject('spell', id)

    analytics.screen('Spell', {
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

    const title = get(data, 'spell.name')

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
      spell: { castTime, description, icon, range }
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
                  Cast time
                </Text>
                <Text style={styles.value}>{castTime}</Text>
              </Grid.Column>
              {range && (
                <Grid.Column>
                  <Text style={styles.label} semibold right>
                    Range
                  </Text>
                  <Text style={styles.value} right>
                    {range}
                  </Text>
                </Grid.Column>
              )}
            </Grid.Row>
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
  data: get(objects, `spell.${getParam('id')}`)
})

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spell)
