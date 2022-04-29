import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  textHeader: {
    color: '#8790E0',
  },
});

export default function SettingsHeader() {
  const navigation = useNavigation();

  return (
    <View
      style={tw`flex flex-row w-full justify-between px-2 pr-3 items-center`}
    >
      <View style={tw`flex flex-row justify-between  items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Root')}
          style={tw`h-16 flex flex-row items-center mr-3`}
        >
          <AntDesign name="left" size={32} color="#8790E0" style={tw``} />
        </TouchableOpacity>
        <Text style={[tw`text-3xl font-bold`, styles.textHeader]}>
          Settings
        </Text>
      </View>
    </View>
  );
}
