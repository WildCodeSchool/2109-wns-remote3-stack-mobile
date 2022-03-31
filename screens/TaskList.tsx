import { Pressable, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import TaskListView from '../components/tasks/TaskListView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
  btnAdd: {
    backgroundColor: '#7950EC',
  },
});

function TaskList() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={[styles.btnAdd, tw`py-3 mt-11 rounded-lg w-11/12`]}
        onPress={() => navigation.navigate('Createtask')}
      >
        <Text style={tw`text-white text-center font-bold`}>ADD TASK</Text>
      </Pressable>
      <TaskListView />
    </SafeAreaView>
  );
}

export default TaskList;
