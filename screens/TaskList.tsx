import { Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function TaskList() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`text-white font-bold text-2xl`}>TaskList</Text>
    </SafeAreaView>
  );
}

export default TaskList;
