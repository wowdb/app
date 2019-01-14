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
  Result,
  Spinner,
  Text
} from '../components'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

class Mount extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle="Mount"
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

    getObject('mount', id)

    analytics.screen('Mount', {
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

    const itemId = get(data, 'mount.itemId')

    if (itemId) {
      getObject('item', itemId)
    }

    const title = get(data, 'mount.name')

    if (title) {
      setParams({
        title
      })
    }
  }

  render() {
    const { data, item, loading } = this.props

    if (loading) {
      return <Spinner full />
    }

    if (!data) {
      return <NotFound />
    }

    const {
      comments,
      mount: { description, isAquatic, isFlying, isGround, isJumping }
    } = data

    return (
      <Main style={styles.main} scroll>
        <SafeAreaView>
          {get(item, 'item') && (
            <Result style={styles.item} type="item" {...get(item, 'item')} />
          )}
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
                  Runs
                </Text>
                <Text style={styles.value}>{isGround ? 'Yes' : 'No'}</Text>
              </Grid.Column>
              <Grid.Column small>
                <Text style={styles.label} semibold right>
                  Jumps
                </Text>
                <Text style={styles.value} right>
                  {isJumping ? 'Yes' : 'No'}
                </Text>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Swims
                </Text>
                <Text style={styles.value}>{isAquatic ? 'Yes' : 'No'}</Text>
              </Grid.Column>
              <Grid.Column small>
                <Text style={styles.label} semibold right>
                  Flies
                </Text>
                <Text style={styles.value} right>
                  {isFlying ? 'Yes' : 'No'}
                </Text>
              </Grid.Column>
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
  item: {
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
  }
})

const mapStateToProps = (
  { objects: { objects, loading } },
  { navigation: { getParam } }
) => {
  const id = getParam('id')

  const data = get(objects, `mount.${id}`)

  let item

  const itemId = get(data, 'mount.itemId')

  if (itemId) {
    item = get(objects, `item.${itemId}`)
  }

  return {
    data,
    item,
    loading
  }
}

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mount)
