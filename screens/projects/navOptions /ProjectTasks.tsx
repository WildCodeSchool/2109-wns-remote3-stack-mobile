/* eslint-disable react/jsx-curly-brace-presence */
import { Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

export default function ProjectTasks() {
  return (
    <View style={tw`mt-2 px-4 border-t border-white pt-5`}>
      <Text style={tw`text-white font-bold`}>{`Project's tasks list`}</Text>
    </View>
  );
}