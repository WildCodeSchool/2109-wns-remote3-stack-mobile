import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_NOTIFICATIONS } from '../../API/queries/notificationQueries';
import { GetAllNotifications } from '../../API/types/GetAllNotifications';
import OneNotification from '../newsfeed/OneNotification';

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

export default function NewsFeed() {
  const { data, loading, error } = useQuery<GetAllNotifications>(
    GET_ALL_NOTIFICATIONS
  );

  if (loading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>{error}</Text>;

  const reversedData = [...data.getAllNotifications].reverse();

  return (
    <View style={styles.container}>
      <FlatList
        data={reversedData}
        keyExtractor={(notification) => notification.id}
        renderItem={({ item }) => <OneNotification item={item} />}
      />
    </View>
  );
}
