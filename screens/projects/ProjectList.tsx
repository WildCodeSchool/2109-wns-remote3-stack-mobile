import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import Menu from '../../components/Menu';
import ProjectListView from '../../components/ProjectListView';
import ProjectFeed from './ProjectFeed';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
});

function ProjectList() {
  const [isActive, setIsActive] = useState('list');
  return (
    <SafeAreaView style={styles.container}>
      <Menu
        firstLabel="ProjectList"
        secondLabel="News feed"
        addLabel="project"
        setIsActive={setIsActive}
        isActive={isActive}
      />
      {isActive === 'list' && <ProjectListView />}
      {isActive === 'feed' && <ProjectFeed />}
    </SafeAreaView>
  );
}

export default ProjectList;
