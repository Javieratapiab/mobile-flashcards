import { AsyncStorage } from 'react-native'
export const DECKS = 'Flashcards:decks'

// Get all decks
export async function allDecks() {
  try {
    return await AsyncStorage.getItem(DECKS)
  } catch(err) {
    return {}
  }
}

// Creates deck
export function saveDeckTitle(deck) {
  AsyncStorage.mergeItem(DECKS, JSON.stringify(deck))
}

// Create card by deck
export async function addCardToDeck(title, card) {
  try {
    await AsyncStorage.getItem(DECKS).then((results) => {
      let decks = JSON.parse(results)
      decks[title]['questions'] = decks[title]['questions']
                                  ? decks[title]['questions'].concat(card[0])
                                  : card
      AsyncStorage.setItem(DECKS, JSON.stringify(decks))
    })
  } catch(err) {
    return {}
  }
}
