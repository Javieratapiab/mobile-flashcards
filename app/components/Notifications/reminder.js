import React, { Component } from 'react';
import { View,
         Text,
         Alert,
         DatePickerIOS,
         TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { setLocalNotification, clearLocalNotification } from '../../utils/helpers'
import { ActionButtons, TextButton, MainTitle } from '../Styles/main'
import { Entypo } from '@expo/vector-icons'

class Reminder extends Component {
  constructor(props) {
    super(props)
    this.state = { chosenDate: new Date() }
    this.setDate = this.setDate.bind(this)
  }

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate })
  }

  render() {
    const displayAlert = (status) => {
      Alert.alert('Reminders', `are ${status}`, { text: 'OK' }, { cancelable: false })
    }
    return(
      <View>
        <MainTitle>Create a reminder <Entypo name="pin" size={30} color={'red'} /></MainTitle>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
        <ActionButtons>
         <TouchableOpacity onPress={() => clearLocalNotification()
                                          .then(setLocalNotification(this.state.chosenDate))
                                          .then(displayAlert('activated.'))}>
          <TextButton>Activate</TextButton>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => clearLocalNotification()
                                          .then(displayAlert('removed.'))}>
          <TextButton>Clear</TextButton>
         </TouchableOpacity>
        </ActionButtons>
      </View>
    )
  }
}

export default Reminder