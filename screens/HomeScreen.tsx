/* eslint-disable global-require */
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import NavOptions from '../components/homepage/NavOptions';
import NewsFeed from '../components/homepage/NewsFeed';
import { registerForPushNotificationsAsync } from '../utils/expo/notifications';
import { useExpoTokenFromStore } from '../store/slices/expoToken.slice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
function HomeScreen() {
  const { dispatchExpoToken } = useExpoTokenFromStore();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      dispatchExpoToken({ value: token || '' });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavOptions />
      <NewsFeed />
    </SafeAreaView>
  );
}

export default HomeScreen;
