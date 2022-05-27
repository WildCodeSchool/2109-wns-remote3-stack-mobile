import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15192C',
      }}
    >
      <ActivityIndicator size="large" color="#8790E0" />
    </View>
  );
}
