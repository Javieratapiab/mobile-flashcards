import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StatusBar from './app/components/AppStatusBar'
import { $color2 } from './app/utils/colors'
import { MainNavigator } from './app/config/routes'

const App = () => (
  <View style= {{ flex: 1 }}>
    <StatusBar backgroundColor={ '#000000' } barStyle="light-content" />
    <MainNavigator />
  </View>
)

export default App