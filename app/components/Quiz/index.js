import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MainTitle,
        StyledCard,
        TextCard,
        ButtonText,
        TextButton,
        ActionButtons,
        ScoreText } from '../Styles/main'
import { Entypo } from '@expo/vector-icons'

export class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: [],
      questions: [],
      questionIndex: 0,
      correct: 0,
      score: 0,
      showAnswer: false
    }
  }

  componentDidMount() {
    let deck = this.props.navigation.state.params.deck
    let questions = deck['questions'] ? deck['questions'] : []
    this.setState({ questions, deck })
  }

  setCorrect = () => {
    const { questionIndex, correct } = this.state
    this.setState({
      questionIndex: questionIndex + 1,
      correct: correct + 1,
      showAnswer: false
    })
  }

  setIncorrect = () => {
    const { questionIndex } = this.state
    this.setState({ questionIndex: questionIndex + 1 })
  }

  showAnswer = () => {
    this.setState(prevState => {
      return {
        showAnswer: !prevState.showAnswer
      }
    })
  }

  goToNavigate = (stack) => {
    const { navigate } = this.props.navigation
    navigate(stack, { deck: this.state.deck })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  restartQuiz = () => {
    this.setState({
      questionIndex: 0,
      correct: 0,
      score: 0,
      showAnswer: false
    })
  }

  renderScore = () => {
    const { correct, questions } = this.state
    let percentage = Math.round(correct * 100 / questions.length)
    return (
      <View>
        <StyledCard>
          <TextCard>Your score: {percentage}% correct.
            <Entypo name="trophy" size={35} color={'orange'} />
          </TextCard>
        </StyledCard>
        <ActionButtons>
          <TouchableOpacity onPress={() => this.restartQuiz()}>
            <TextButton>Restart quiz</TextButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goBack()}>
            <TextButton>Back to deck</TextButton>
          </TouchableOpacity>
        </ActionButtons>
      </View>
    )
  }

  renderNoData = () => {
    return (
      <View>
        <StyledCard>
          <MainTitle>
            This desk doesn't have cards. Let's create ones!
          </MainTitle>
        </StyledCard>
        <TouchableOpacity onPress={() => this.goToNavigate('NewCard')}>
          <TextButton>New card</TextButton>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { questions, questionIndex, showAnswer } = this.state
    const inProcess = questionIndex < questions.length
    const questionsLeft = questions.length - questionIndex

    if (questions.length == 0 ) {
      return this.renderNoData()
    }

    return (
      <View style= {{flex: 1}}>
        { inProcess ? (
          <View>
            <ScoreText>{questionsLeft} / {questions.length}</ScoreText>
            { showAnswer ? (
              <StyledCard>
                <TextCard>{ questions[questionIndex].answer }</TextCard>
              </StyledCard>
            ) : (
              <StyledCard>
                <TextCard>{ questions[questionIndex].question }</TextCard>
              </StyledCard>
           )}
            <ActionButtons>
              <TouchableOpacity onPress={() => this.setCorrect()}>
                <Text>
                  <Entypo name="check" size={35} color={'green'} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.showAnswer()}>
                <TextButton>
                { showAnswer ? 'Show question' : 'Show answer' }
                </TextButton>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setIncorrect()}>
                <Text>
                  <Entypo name="cross" size={40} color={'red'} />
                </Text>
              </TouchableOpacity>
            </ActionButtons>
          </View>
        ) : (
          this.renderScore()
        )}
      </View>
    )
  }
}

export default Quiz