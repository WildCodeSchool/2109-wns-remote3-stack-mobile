/* eslint-disable global-require */
import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import NavOptions from '../components/homepage/NavOptions';
import NewsFeed from '../components/homepage/NewsFeed';

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
  return (
    <SafeAreaView style={styles.container}>
      <NavOptions />
      <NewsFeed />
    </SafeAreaView>
  );
}

export default HomeScreen;
