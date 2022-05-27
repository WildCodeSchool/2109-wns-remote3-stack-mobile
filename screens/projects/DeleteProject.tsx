import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { getProjectByIdId } from '../../API/types/getProjectByIdId';
import DELETE_PROJECT from '../../API/mutation/deleteProject';
import {
  GET_ALL_PROJECTS,
  GET_ONE_PROJECT,
} from '../../API/queries/projectQueries';
import { RootStackParamList } from '../../types';
import Loader from '../../components/Loader';
import Page404 from '../Page404';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    padding: 20,
  },
  button: {
    backgroundColor: '#8790E0',
  },
});

type RootStackParam = {
  id: { id: string };
};

type ProjectScreenProps = StackNavigationProp<
  RootStackParamList,
  'ProjectDetails'
>;

export default function DeleteProject() {
  const navigation = useNavigation<ProjectScreenProps>();
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;

  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
  });

  const [deleteProject, { loading: deleteLoad, error: deleteError }] =
    useMutation(DELETE_PROJECT, {
      refetchQueries: [
        {
          query: GET_ALL_PROJECTS,
        },
      ],
      onCompleted: () => {
        navigation.navigate('Root');
      },
    });

  if (loading || deleteLoad) {
    return <Loader />;
  }
  if (error || !data || deleteError) {
    return <Page404 />;
  }

  return (
    <View style={styles.container}>
      <View style={tw`flex`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          Are you sure you want to delete the project:{''}{' '}
          {data.getProjectByID.name} ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteProject({
              variables: { deleteProjectByIdId: id },
            });
          }}
          style={[tw`w-full p-4 rounded-md my-4 mt-10`, styles.button]}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectDetails', { id })}
          style={[tw`w-full p-4 rounded-md my-4`, styles.button]}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
