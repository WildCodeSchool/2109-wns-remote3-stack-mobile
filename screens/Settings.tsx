import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`text-white font-bold text-2xl`}>Stack settings</Text>
    </SafeAreaView>
  );
}

export default Settings;
