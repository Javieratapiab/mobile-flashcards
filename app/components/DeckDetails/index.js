import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button, Animated } from 'react-native'
import { StyledCard,
         TextCard,
         TextSecondaryCard,
         ButtonsSection,
         TextButton
        } from '../Styles/main'
import NewCard from '../Cards/New/index'

class DeckDetails extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 700,
      }
    ).start();
  }

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
    let { fadeAnim } = this.state
    const { navigation } = this.props
    const { deck } = navigation !== undefined
                    ? navigation.state.params
                    : this.props
    return (
      <View>
        <Animated.View style={{ ...this.props.style, opacity: fadeAnim }}>
          <StyledCard>
            <TextCard>{ deck.title }</TextCard>
            <TextSecondaryCard>{deck.questions ? deck.questions.length : 0 } cards</TextSecondaryCard>
          </StyledCard>
          { this.renderButtons(navigation, deck) }
        </Animated.View>
      </View>
    )
  }
}

export default DeckDetails