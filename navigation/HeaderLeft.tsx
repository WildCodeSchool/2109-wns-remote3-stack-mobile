/* eslint-disable global-require */
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import dateFormat from 'dateformat';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

export default function HeaderLeft({ title }: { title: string }) {
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
      paddingTop: 5,
    },
  });

  return (
    <View style={tw`px-5 pt-14 h-32 w-96`}>
      {title === 'home' ? (
        <Pressable>
          <Image
            style={tw`h-14 w-44`}
            source={require('../assets/images/logohome.png')}
          />
        </Pressable>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
      <Text style={styles.date}>{now}</Text>
    </View>
  );
}
