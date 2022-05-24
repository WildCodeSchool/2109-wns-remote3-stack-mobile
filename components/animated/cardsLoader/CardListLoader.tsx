import { StyleSheet, View } from 'react-native';
import React from 'react';
import CardLoader from './CardLoader';

const styles = StyleSheet.create({
  container: {
    height: '80%',
    marginTop: 20,
    paddingTop: 10,
    textAlign: 'left',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#8790E0',
    backgroundColor: '#15192C',
  },
});

export default function CardListLoader() {
  return (
    <View style={styles.container}>
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
    </View>
  );
}
