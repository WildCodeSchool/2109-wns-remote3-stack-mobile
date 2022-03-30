import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import StatusNavigation from '../../../components/StatusNavigation';
import { GET_ONE_PROJECT } from '../../../API/queries/projectQueries';
import Loader from '../../../components/Loader';
import OneTask from '../../../components/tasks/OneTask';
import { getProjectByIdId } from '../../../API/types/getProjectByIdId';

type RootStackParam = {
  id: { id: string };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
});

export default function ProjectTasks() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const navgation = useNavigation();
  const { id } = route.params;

  const [taskNav, setTaskNav] = useState('TO_DO');
  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <View style={[tw`px-4 py-5`, styles.container]}>
      <Pressable
        onPress={() => navgation.navigate('ProjectDetails', { id })}
        style={tw`flex items-center w-full bg-purple-300 bg-opacity-10 rounded-lg p-2 mb-5`}
      >
        <AntDesign name="caretdown" size={24} color="#8790E0" />
      </Pressable>
      <Text style={tw`text-white text-xl font-bold`}>Tasks</Text>
      <StatusNavigation
        backgroundColor="light"
        nav={taskNav}
        setNav={setTaskNav}
      />
      {data.getProjectByID.tasks.filter((item) => item.advancement === taskNav)
        .length === 0 && (
        <Text style={tw`text-white text-base mt-4`}>
          This project has no tasks for now ...
        </Text>
      )}
      <FlatList
        data={data.getProjectByID.tasks.filter(
          (item) => item.advancement === taskNav
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <OneTask item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
