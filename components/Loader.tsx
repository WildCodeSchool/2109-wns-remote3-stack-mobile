/* eslint-disable react/no-children-prop */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function DescriptionTaskDetails() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#8790E0" />
    </View>
  );
}
