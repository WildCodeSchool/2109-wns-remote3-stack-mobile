import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  getProjectByIdId_getProjectByID_tasks,
  getProjectByIdId,
} from '../../API/types/getProjectByIdId';
import { GET_ONE_PROJECT } from '../../API/queries/projectQueries';

interface OneTaskProps {
  item: getProjectByIdId_getProjectByID_tasks;
}
const styles = StyleSheet.create({
  container: {
    borderColor: '#8790E0',
    borderRadius: 10,
    shadowColor: '#8790E0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    color: '#ffff',
  },
  advancementDone: {
    backgroundColor: '#2C9E7C',
  },
  advancementTodo: {
    backgroundColor: '#2B8AD1',
  },
  advancementInProgress: {
    backgroundColor: '#E4AC65',
  },
});

function OneTask({ item }: OneTaskProps) {
  const navigation = useNavigation();

  // Fetch Project Name by ProjectId
  const {
    loading: loadingProject,
    error: errorProject,
    data: dataProject,
  } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: {
      getProjectByIdId: item.projectId,
    },
  });

  if (loadingProject) {
    return <Text>...loading </Text>;
  }
  if (errorProject || !dataProject) {
    return <Text> error </Text>;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TaskDetails' as never, { id: item.id } as never)
      }
      style={[styles.container, tw`mx-3 p-5 border mt-5`]}
    >
      <View style={tw`flex-row w-full mb-2 justify-between`}>
        <View>
          <Text style={[tw`text-xl font-bold`, styles.text]}>{item.name}</Text>
          <Text style={styles.text}>{dataProject.getProjectByID.name}</Text>
        </View>
        <View>
          <View
            style={[
              tw`ml-1 py-1 rounded-sm pl-2 pr-3`,
              item.advancement === 'TO_DO' && styles.advancementTodo,
              item.advancement === 'IN_PROGRESS' &&
                styles.advancementInProgress,
              item.advancement === 'DONE' && styles.advancementDone,
            ]}
          >
            <Text style={[tw`ml-1 py-1 px-2 text-xs`, styles.text]}>
              {item.advancement}
            </Text>
          </View>
        </View>
      </View>
      <View style={tw`flex-row justify-between`}>
        <Text style={styles.text}>
          Created at: {new Date(item.startDate).toLocaleDateString()}
        </Text>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={[tw`ml-1`, styles.text]}> 12 </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default OneTask;
