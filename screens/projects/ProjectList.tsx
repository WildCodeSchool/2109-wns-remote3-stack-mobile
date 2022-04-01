import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import ProjectListView from '../../components/ProjectListView';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15192C',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#8790E0',
  },
  text: {
    color: '#8790E0',
    fontSize: 30,
    fontWeight: 'bold',
  },
  date: {
    color: '#8790E0',
    fontSize: 13,
  },
});

function ProjectList() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={tw`flex flex-row mt-12 w-11/12 justify-between items-end mx-4`}
      >
        <View>
          <Text style={styles.text}>Projects</Text>
        </View>
        <TouchableOpacity
          style={[tw` rounded-md ml-4 px-8 py-2`, styles.button]}
          onPress={
            route.name === 'TaskList'
              ? () => navigation.navigate('Createtask')
              : () =>
                  navigation.navigate('CreateUpdateproject', {
                    id: undefined,
                  })
          }
        >
          <Text style={tw`text-white font-bold`}>New project +</Text>
        </TouchableOpacity>
      </View>
      <ProjectListView />
    </SafeAreaView>
  );
}

export default ProjectList;
