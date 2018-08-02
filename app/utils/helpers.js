// Helper methods
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'FlashCards:reminders'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function setNotification() {
  return {
    title: 'Practice something today!',
    body: '📚 don\'t forget to take a quiz today!',
    ios: {
      sound: true,
    },
  }
}

export function setLocalNotification(date) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()
          Notifications.scheduleLocalNotificationAsync(setNotification(), {
            time: date,
            repeat: 'day'
          })
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}

export function generateUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4();
}