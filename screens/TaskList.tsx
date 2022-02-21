import { Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TaskListView from '../components/tasks/TaskListView';
import Menu from '../components/Menu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
});

function TaskList() {
  const [isActive, setIsActive] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <Menu
        firstLabel="Task List"
        secondLabel="New feed"
        addLabel="task"
        setIsActive={setIsActive}
      />
      {isActive && <TaskListView />}
      {!isActive && <Text>newfeed</Text>}
    </SafeAreaView>
  );
}

export default TaskList;
