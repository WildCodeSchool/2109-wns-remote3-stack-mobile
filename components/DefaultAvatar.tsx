import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  userFirstName: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8790E0',
  },
});

export default function DefaultAvatar({ userFirstName }: IProps) {
  const letter = userFirstName.split('')[0];
  return (
    <View
      style={[
        tw`h-12 w-12 rounded-full flex items-center justify-center`,
        styles.container,
      ]}
    >
      <Text style={tw`text-white text-2xl`}>{letter}</Text>
    </View>
  );
}
