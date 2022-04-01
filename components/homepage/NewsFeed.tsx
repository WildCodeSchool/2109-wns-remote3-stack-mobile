import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useQuery } from '@apollo/client';
import { GET_ALL_NOTIFICATIONS } from '../../API/queries/notificationQueries';
import {
  GetAllNotifications,
  GetAllNotifications_getAllNotifications,
} from '../../API/types/GetAllNotifications';
import OneNotification from '../newsfeed/OneNotification';
import { ALL_NOTIFICATIONS_SUBSCRIPTION } from '../../API/subscriptions/notificationsSubscriptions';
import { AllNotificationsSubscription } from '../../API/types/AllNotificationsSubscription';
import { useExpoTokenFromStore } from '../../store/slices/expoToken.slice';
import { sendPushNotification } from '../../utils/expo/notifications';

const styles = StyleSheet.create({
  container: {
    height: '44%',
    marginTop: 20,
    textAlign: 'left',
    width: '93%',
  },
  text: {
    color: '#8790E0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

type NewNotificationType = {
  subscriptionData: {
    data: AllNotificationsSubscription;
  };
};

export default function NewsFeed() {
  const { expoToken } = useExpoTokenFromStore();
  const [notifications, setNotifications] =
    useState<GetAllNotifications_getAllNotifications[]>();
  const { data, loading, error, subscribeToMore } =
    useQuery<GetAllNotifications>(GET_ALL_NOTIFICATIONS, {
      onCompleted: () => {
        if (data) setNotifications([...data.getAllNotifications].reverse());
      },
    });

  useEffect(() => {
    subscribeToMore({
      document: ALL_NOTIFICATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }: NewNotificationType) => {
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.newNotification;

        sendPushNotification(expoToken.value, newItem);
        setNotifications([...prev.getAllNotifications, newItem].reverse());
        return { ...prev, newItem };
      },
    });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={tw``}>
        <FlatList
          data={notifications || [...data.getAllNotifications].reverse()}
          keyExtractor={(notification) => notification.id}
          renderItem={({ item }) => <OneNotification item={item} />}
        />
      </View>
    </View>
  );
}
