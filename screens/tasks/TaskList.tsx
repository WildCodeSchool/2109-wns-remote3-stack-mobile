import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import TaskListView from '../../components/tasks/TaskListView';

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
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function TaskList() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`flex-row mt-12 items-end w-11/12 mx-4 justify-between`}>
        <Text style={[styles.text]}>Tasks</Text>
        <TouchableOpacity
          style={[styles.btnAdd, tw`rounded-md ml-4 px-8 py-2`]}
          onPress={() => navigation.navigate('Createtask')}
        >
          <Text style={tw`text-white font-bold`}> New task +</Text>
        </TouchableOpacity>
      </View>

      <TaskListView />
    </SafeAreaView>
  );
}

export default TaskList;
