/* eslint-disable no-alert */
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AllNotificationsSubscription_newNotification } from '../../API/types/AllNotificationsSubscription';

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // eslint-disable-next-line consistent-return
  return token;
}

async function sendPushNotification(
  expoPushToken: string,
  newNotification: AllNotificationsSubscription_newNotification
) {
  const actionType: Record<string, string> = {
    ADDED: 'created',
    EDITED: 'edited',
    DELETED: 'deleted',
  };
  const objectType: Record<string, string> = {
    COMMENT: 'comment',
    PROJECT: 'project',
    TASK: 'task',
  };
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Slite',
    body: `${newNotification.editorName} ${
      actionType[newNotification.actionType]
    } ${objectType[newNotification.type]} ${
      newNotification.modifiedObjectName
    }`,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export { registerForPushNotificationsAsync, sendPushNotification };
