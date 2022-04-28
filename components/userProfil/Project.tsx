import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { GET_ONE_PROJECT } from '../../API/queries/projectQueries';
import Loader from '../Loader';
import OneProject from '../projects/OneProject';
import { getProjectByIdId } from '../../API/types/getProjectByIdId';

interface IProps {
  projectId: string;
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: '#15192C',
    flex: 1,
    width: '100%',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8790E0',
    shadowColor: '#8790E0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.95,
    elevation: 18,
  },
});
export default function Project({ projectId }: IProps) {
  const navigation = useNavigation();
  const { data, loading, error } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: projectId },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProjectDetails', { id: data.getProjectByID.id })
      }
      style={styles.card}
    >
      <OneProject item={data.getProjectByID} />
    </TouchableOpacity>
  );
}
