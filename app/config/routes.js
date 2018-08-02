import React, { Component } from 'react'
import { createMaterialTopTabNavigator,
         createBottomTabNavigator,
         createStackNavigator,
       } from 'react-navigation'
import { View, Text, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import { $color2, $color5, $color3, $color4, $color1 } from '../utils/colors'
import DeckList from '../components/DecksList/index'
import DeckDetails from '../components/DeckDetails/index'
import NewDeck from '../components/NewDeck/index'
import NewCard from '../components/Cards/New/index'

// TODO: settings component to get a notification reminder
const settings = () => (
  <View>
    <Text>Settings!</Text>
  </View>
);

// Defines style for navigation tabs
const NavigationStyle = Platform.OS === 'ios'
                        ? createBottomTabNavigator
                        : createMaterialTopTabNavigator
const TouchableEntity = Platform.OS === 'ios'
                        ? TouchableOpacity
                        : TouchableNativeFeedback

export const Tabs = NavigationStyle({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks',
      tabBarButtonComponent: TouchableEntity,
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="documents" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        activeTintColor: "#000000",
      },
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
      tabBarButtonComponent: TouchableEntity,
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="plus" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        activeTintColor: "#000000"
      }
    }
  },
  Settings: {
    screen: settings,
    navigationOptions: {
      title: 'Settings',
      tabBarButtonComponent: TouchableEntity,
      tabBarIcon: ({ tintColor }) => (
        <Feather name="settings" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        activeTintColor: "#000000"
      }
    }
  }
})

export const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: $color4,
      title: 'Mobile flashcards'
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: $color4,
      title: 'Deck details'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: $color4,
      title: 'New Deck'
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: $color4,
      title: 'New Card'
    }
  }
})