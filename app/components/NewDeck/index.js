import React, { Component } from 'react'
import { Text, View,
        TextInput, Keyboard,
        Alert, AsyncStorage,
        TouchableOpacity } from 'react-native'
import { HeadingText, CustomTextInput,
         NewDeckSection, StyledCard,
         MainTitle, TextButton } from '../Styles/main'
import { $color7 } from '../Styles/main'
import { saveDeckTitle, allDecks } from '../../utils/storage'
import { generateUUID } from '../../utils/helpers'

class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      id: ''
    }
  }

  validateTitle() {
    Keyboard.dismiss()
    if (this.state['title'] == '') {
      return Alert.alert('Please, enter a valid deck title.')
    }
    this.createDeck()
  }

  createDeck() {
    const { navigate } = this.props.navigation
    let title = this.state['title']
    let newDeck = {}
    newDeck[title] = { title: title, id: generateUUID() }
    saveDeckTitle(newDeck)
    allDecks().then((results) => {
      let parsed = JSON.parse(results)
      if (parsed[title]) {
        this.setState({ title: '' })
        navigate('DeckDetails', { deck: parsed[title] })
      }
    })
  }

  render() {
    const { title } = this.state
    return (
      <NewDeckSection>
        <MainTitle>Create a new deck</MainTitle>
        <StyledCard>
          <HeadingText>What is the title of your next deck?</HeadingText>
          <TextInput
            keyboardType='default'
            onChangeText={(title) => this.setState({ title: title }) }
            value={ title }
            style={{height: 40}}
            placeholder='i.e. Machine learning'
            placeholderTextColor={ $color7 }
            autoFocus={true}
            accessible={false}
          >
          </TextInput>
        </StyledCard>
        <TouchableOpacity onPress={() => this.validateTitle()}>
          <TextButton>SUBMIT</TextButton>
        </TouchableOpacity>
     </NewDeckSection>
    )
  }
}

export default NewDeck