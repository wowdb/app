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

class Quest extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavBar
        back
        subtitle="Quest"
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

    getObject('quest', id)

    analytics.screen('Quest', {
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

    const title = get(data, 'quest.title')

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
      quest: { category, level, reqLevel }
    } = data

    return (
      <Main style={styles.main} scroll>
        <SafeAreaView>
          <View style={styles.content}>
            <Grid.Row>
              <Grid.Column>
                <Text style={styles.label} semibold>
                  Level
                </Text>
                <Text style={styles.value}>{level}</Text>
              </Grid.Column>
              <Grid.Column>
                <Text style={styles.label} semibold right>
                  Required level
                </Text>
                <Text style={styles.value} right>
                  {reqLevel}
                </Text>
              </Grid.Column>
            </Grid.Row>
            <Text style={styles.label} semibold>
              Category
            </Text>
            <Text style={styles.value}>{category}</Text>
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
) => ({
  loading,
  data: get(objects, `quest.${getParam('id')}`)
})

const mapDispatchToProps = dispatch => ({
  getObject: (type, id) => dispatch(getObject(type, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quest)
