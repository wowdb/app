import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Hyperlink from 'react-native-hyperlink'

import { getFaq } from '../actions'
import { Main, NavBar, Spinner } from '../components'
import { segment } from '../lib'
import { Colors, Fonts, Layout } from '../styles'

class Help extends Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    header: <NavBar title="Help" goBack={goBack} />
  })

  componentDidMount() {
    const { data, getFaq } = this.props

    if (data.length === 0) {
      getFaq()
    }

    segment.screen('help')
  }

  renderItem = item => {
    const { question, answer } = item

    return (
      <View style={styles.item}>
        <Text style={styles.question}>{question}</Text>
        <Hyperlink linkDefault={true} linkStyle={styles.link}>
          <Text style={styles.answer}>{answer}</Text>
        </Hyperlink>
      </View>
    )
  }

  render() {
    const { data, loading } = this.props

    if (loading) {
      return (
        <Main style={styles.loading}>
          <Spinner />
        </Main>
      )
    }

    return (
      <Main>
        <FlatList
          data={data}
          refreshing={loading}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    padding: Layout.margin
  },
  question: {
    ...Fonts.subtitle,
    color: Colors.accent
  },
  link: {
    color: Colors.accent
  },
  answer: {
    color: Colors.text,
    marginTop: Layout.padding
  }
})

const mapStateToProps = (state, props) => {
  const { faq: { data, loading } } = state

  return {
    data,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFaq: () => dispatch(getFaq())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)
