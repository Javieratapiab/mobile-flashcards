import React, { Component } from 'react'
import { View, Text,
        TextInput, Alert,
        TouchableOpacity,
        AsyncStorage } from 'react-native'
import { $color4 } from '../../../utils/colors'
import { HeadingText, CustomTextInput,
        NewDeckSection, StyledCard,
        MainTitle, TextButton } from '../../Styles/main'
import { addCardToDeck } from '../../../utils/storage'

class NewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }

  submit(input) {
    const { deck } = this.props.navigation.state.params
    const { navigate } = this.props.navigation
    const { question, answer } = this.state
    let valid = this.validateFields()
    if (valid) {
      let questions = [{ question, answer }]
      addCardToDeck(deck.title, questions).then(() => {
       navigate('Home')
      })
    }
  }

  validateFields() {
    const { question, answer } = this.state
    if (question == '' && answer == '') {
      return Alert.alert('Please, enter a question and answer before submit')
    } else if (question == '' && answer !== '') {
      return Alert.alert('Please, enter a question before submit')
    } else if (question !== '' && answer == '') {
      return Alert.alert('Please, enter an answer before submit')
    } else {
      return true
    }
  }

  render() {
    const { question, answer } = this.state
    return(
      <NewDeckSection>
        <MainTitle>Create your new card</MainTitle>
        <StyledCard>
          <HeadingText>Save a question</HeadingText>
          <TextInput
            keyboardType='default'
            onChangeText={(question) => this.setState({ question: question })}
            value={ question }
            style={{height: 40}}
            placeholder='i.e. What is Bayes’ Theorem?'
            placeholderTextColor={$color4}
            autoFocus={true}
            accessible={false}
          >
          </TextInput>
        </StyledCard>
        <StyledCard>
          <HeadingText>Save an answer</HeadingText>
          <TextInput
            keyboardType='default'
            onChangeText={(answer) => this.setState({ answer: answer })}
            value={answer}
            style={{height: 40}}
            placeholder='i.e. Gives posterior probability
                        of an event given what is known as prior knowledge.'
            placeholderTextColor={$color4}
            accessible={false}
          >
          </TextInput>
        </StyledCard>
        <TouchableOpacity onPress={() => this.submit()}>
          <TextButton>SUBMIT</TextButton>
        </TouchableOpacity>
     </NewDeckSection>
    )
  }
}

export default NewCard