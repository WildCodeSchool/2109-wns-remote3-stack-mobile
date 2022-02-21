import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function ProjectList() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`text-white font-bold text-2xl`}>ProjectList</Text>
    </SafeAreaView>
  );
}

export default ProjectList;
