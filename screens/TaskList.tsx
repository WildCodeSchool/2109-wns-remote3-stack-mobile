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
  const [isActive, setIsActive] = useState('list');
  return (
    <SafeAreaView style={styles.container}>
      <Menu
        firstLabel="Task List"
        secondLabel="New feed"
        addLabel="task"
        setIsActive={setIsActive}
        isActive={isActive}
      />
      {isActive === 'list' && <TaskListView />}
      {isActive === 'feed' && <Text>newfeed</Text>}
    </SafeAreaView>
  );
}

export default TaskList;
