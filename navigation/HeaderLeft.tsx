/* eslint-disable global-require */
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import dateFormat from 'dateformat';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

export default function HeaderLeft() {
  const now = dateFormat(new Date(), 'dddd dd mmmm yyyy');
  const styles = StyleSheet.create({
    text: {
      color: '#8790E0',
      fontSize: 30,
      fontWeight: 'bold',
    },
    date: {
      color: '#8790E0',
      fontSize: 13,
    },
  });

  return (
    <View style={tw`px-5 pt-16 mb-5 h-28 w-52`}>
      <Pressable>
        <Image
          style={tw`h-5/6 w-4/6`}
          source={require('../assets/images/logohome.png')}
        />
      </Pressable>

      <Text style={styles.date}>{now}</Text>
    </View>
  );
}
