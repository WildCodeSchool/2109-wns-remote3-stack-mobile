import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Error from '../Error';
import Loader from '../Loader';

const styles = StyleSheet.create({
  container: {
    height: '44%',
    marginTop: 20,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#8790E0',
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

  if (loading)
    return (
      <View
        style={{
          height: '44%',
          width: '100%',
          marginTop: 20,
          borderTopWidth: 1,
          borderTopColor: '#8790E0',
        }}
      >
        <Loader />
      </View>
    );

  if (error || !data)
    return (
      <View style={styles.container}>
        <Error />;
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications || [...data.getAllNotifications].reverse()}
        keyExtractor={(notification) => notification.id}
        renderItem={({ item }) => <OneNotification item={item} />}
      />
    </View>
  );
}
