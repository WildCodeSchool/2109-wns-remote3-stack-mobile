import { StyleSheet, View } from 'react-native';
import React from 'react';
import SkeletonCard from './OneFeedLoader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 8,

    backgroundColor: '#15192C',
  },
});

export default function ContainerLoader() {
  return (
    <View style={styles.container}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
}
