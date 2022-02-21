import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

export default function UserProfil() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15192C',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Homepage' as never)}
      >
        <Text style={tw`text-white mb-10 bg-blue-800 p-5`}>Back home</Text>
      </TouchableOpacity>
      <Text style={tw`text-white font-bold text-2xl`}>UserProfil</Text>
    </View>
  );
}