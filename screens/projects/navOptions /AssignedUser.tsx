import { Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

export default function AssignedUser() {
  return (
    <View style={tw`mt-2 px-4 border-t border-white pt-5`}>
      <Text style={tw`text-white font-bold`}>Assigned Users</Text>
    </View>
  );
}
