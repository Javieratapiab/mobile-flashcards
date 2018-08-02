import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { StyledCard,
         TextCard,
         TextSecondaryCard,
         ButtonsSection,
         TextButton
        } from '../Styles/main'
import NewCard from '../Cards/New/index'

class DeckDetails extends Component {

  navigateTo(stack, deck = {}) {
    const { navigate } = this.props.navigation
    navigate(stack, { deck: deck })
  }

  renderButtons(navigation, deck) {
    if ( navigation ) {
      return (
        <ButtonsSection>
          <TouchableOpacity onPress={() => this.navigateTo('NewCard', deck)}>
            <TextButton>Add Card</TextButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigateTo('Quiz', deck)}>
            <TextButton>Start Quiz</TextButton>
          </TouchableOpacity>
        </ButtonsSection>
      )
    }
  }
  render() {
    const { navigation } = this.props
    const { deck } = navigation !== undefined
                    ? navigation.state.params
                    : this.props
    return (
      <View>
        <StyledCard>
          <TextCard>{ deck.title }</TextCard>
          <TextSecondaryCard>{deck.questions ? deck.questions.length : 0 } cards</TextSecondaryCard>
        </StyledCard>
        { this.renderButtons(navigation, deck) }
      </View>
    )
  }
}

export default DeckDetails