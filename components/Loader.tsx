import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function Loader() {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15192C',
      }}
    >
      <View style={tw`w-full`}>
        <ActivityIndicator size="large" color="#8790E0" />
      </View>
    </View>
  );
}
