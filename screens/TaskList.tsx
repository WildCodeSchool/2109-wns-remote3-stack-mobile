import { Pressable, Text, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import TaskListView from '../components/tasks/TaskListView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  btnAdd: {
    backgroundColor: '#8790E0',
  },
  text: {
    color: '#8790E0',
  },
});

function TaskList() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`flex-row mt-11 items-center w-full ml-4 justify-between`}>
        <Text style={[tw`text-white text-3xl font-bold py-3`, styles.text]}>
          Tasks
        </Text>
        <Pressable
          style={[styles.btnAdd, tw`py-3 rounded-lg mr-10 `]}
          onPress={() => navigation.navigate('Createtask')}
        >
          <Text style={tw`text-white text-center px-10 font-bold`}> NEW +</Text>
        </Pressable>
      </View>

      <TaskListView />
    </SafeAreaView>
  );
}

export default TaskList;
