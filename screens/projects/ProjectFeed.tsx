import { Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

// const styles = StyleSheet.create({});

export default function ProjectFeed() {
  return (
    <View style={tw`w-full h-full my-3 pl-4 pb-5`}>
      <Text style={tw`text-white font-bold mt-2`}>ProjectFeed</Text>
    </View>
  );
}
