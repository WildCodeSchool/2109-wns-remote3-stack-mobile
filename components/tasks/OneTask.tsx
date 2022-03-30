import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import dateFormat from 'dateformat';
import { getProjectByIdId } from '../../API/types/getProjectByIdId';
import { GET_ONE_PROJECT } from '../../API/queries/projectQueries';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import Status from '../Status';

interface OneTaskProps {
  item: getTaskByID_getTaskByID;
}
const styles = StyleSheet.create({
  container: {
    borderColor: '#8790E0',
    borderRadius: 10,
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
  if (loadingProject) return null;
  if (errorProject || !dataProject) {
    return <Text> error </Text>;
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TaskDetails', { id: item.id })}
      style={[styles.container, tw` p-5 border mt-3`]}
    >
      <View style={tw`flex-row w-full mb-2 justify-between`}>
        <View>
          <Text style={[tw`text-base font-bold w-44`, styles.text]}>
            {item.name}
          </Text>
          <Text style={styles.text}>{dataProject.getProjectByID.name}</Text>
        </View>
        <Status status={item.advancement} />
      </View>
      <View style={tw`flex-row justify-between`}>
        <Text style={styles.text}>
          Created at:{' '}
          {dateFormat(new Date(item.startDate), 'dddd dd mmmm yyyy')}
        </Text>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={[tw`ml-1`, styles.text]}> {item.comments.length} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default OneTask;
