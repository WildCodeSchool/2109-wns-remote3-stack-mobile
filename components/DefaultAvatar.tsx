import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  userFirstName: string;
  userId: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8790E0',
  },
});

export default function DefaultAvatar({ userFirstName, userId }: IProps) {
  const letter = userFirstName.split('')[0];
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Userprofil', { id: userId })}
      style={[
        tw`h-10 w-10 rounded-full flex items-center justify-center`,
        styles.container,
      ]}
    >
      <Text style={tw`text-white text-center text-2xl`}>{letter}</Text>
    </Pressable>
  );
}
