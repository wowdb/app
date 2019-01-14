import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Hyperlink from 'react-native-hyperlink'

import { NavBar, Text } from '../components'
import { analytics } from '../lib'
import { Colors, Layout } from '../styles'

class Help extends Component {
  static navigationOptions = {
    header: <NavBar back title="Help" />
  }

  componentDidMount() {
    analytics.screen('Help')
  }

  renderItem = ({ item }) => {
    const { answer, question } = item

    return (
      <View style={styles.item}>
        <Text style={styles.question} semibold>
          {question}
        </Text>
        <Hyperlink linkDefault={true} linkStyle={styles.link}>
          <Text style={styles.answer}>{answer}</Text>
        </Hyperlink>
      </View>
    )
  }

  render() {
    const { faq, loading } = this.props

    return (
      <SafeAreaView style={styles.main}>
        <FlatList
          data={faq}
          refreshing={loading}
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primaryDark,
    flex: 1
  },
  item: {
    padding: Layout.margin
  },
  question: {
    color: Colors.accent
  },
  link: {
    color: Colors.accent
  },
  answer: {
    marginTop: Layout.padding
  }
})

const mapStateToProps = ({
  meta: {
    loading,
    meta: { faq }
  }
}) => ({
  faq,
  loading
})

export default connect(mapStateToProps)(Help)
