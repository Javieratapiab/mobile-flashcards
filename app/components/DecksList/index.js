import React, { Component } from 'react'
import { View, Text,
        AsyncStorage, Platform,
        TouchableOpacity, ScrollView,
        RefreshControl } from 'react-native'
import { allDecks, DECKS } from '../../utils/storage'
import { Entypo } from '@expo/vector-icons'
import { $color2 } from '../../utils/colors'
import styled from 'styled-components/native'
import DeckDetails from '../DeckDetails/index'
import { StyledCard, TextCard, MainTitle } from '../Styles/main'

class DeckList extends Component {
  state = {
    refreshing: false,
    decks: []
  }

  _fetchDecks() {
    this.setState({refreshing: true});
    allDecks().then((results) => {
      let parsed = JSON.parse(results)
      this.setState({ refreshing: false })
      if (parsed) {
        let decks = Object.keys(parsed).map((deck) => {
          return parsed[deck]
        })
        this.setState({ decks: decks })
      }
    })
  }

  componentDidMount() {
    this._fetchDecks()
  }

  // Render deck detail
  renderDecks() {
    const { decks } = this.state
    if (decks.length > 0) {
     return decks.map((deck) => {
        return (
          <View key={ deck.title }>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'DeckDetails',
                  { deck: deck }
                )}
            >
              <DeckDetails deck={deck} key={deck.title} />
            </TouchableOpacity>
          </View>
        )
     })
    } else {
     return <StyledCard>
              <TextCard>
                <Entypo name="hand" size={26} color={$color2} />
                  Hey! don't forget to create your decks today
              </TextCard>
            </StyledCard>
    }
  }

  render() {
    return (
      <ScrollView refreshControl= {
        <RefreshControl onRefresh={() => this._fetchDecks()}
                        refreshing={this.state.refreshing}
        />
      }>
      <MainTitle>Select your deck</MainTitle>
        { this.renderDecks() }
      </ScrollView>
    )
  }
}

export default DeckList