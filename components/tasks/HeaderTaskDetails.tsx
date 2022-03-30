import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import dateFormat from 'dateformat';

const styles = StyleSheet.create({
  text: {
    color: '#8790E0',
  },
});
export default function HeaderTaskDetails() {
  const navigation = useNavigation();
  const now = dateFormat(new Date(), 'dddd dd mmmm yyyy');

  return (
    <View style={tw`flex-row w-full mb-2 px-5 items-center justify-between`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Root')}
        style={tw`h-10 flex flex-row items-center`}
      >
        <AntDesign name="left" size={24} color="#8790E0" style={tw`mr-1`} />
      </TouchableOpacity>
      <Text style={styles.text}>{now}</Text>
    </View>
  );
}
