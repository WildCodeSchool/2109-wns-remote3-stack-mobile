import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { GET_ALL_PROJECTS } from '../API/queries/projectQueries';
import OneProject from './projects/OneProject';
import { GetAllProjects } from '../API/types/GetAllProjects';

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: '#15192C',
    flex: 1,
    width: '95%',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8790E0',
    shadowColor: '#8790E0',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.95,
    elevation: 18,
  },
});

export default function ProjectListView() {
  const { loading, error, data } = useQuery<GetAllProjects>(GET_ALL_PROJECTS);
  const navigation = useNavigation();

  if (loading) {
    return <Text>...loading</Text>;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <FlatList
      contentInset={{ bottom: 130 }}
      style={tw`w-full h-full my-3 pl-4 pb-5`}
      data={data.getAllProjects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectDetails', { id: item.id })}
          style={styles.card}
        >
          <OneProject item={item} />
        </TouchableOpacity>
      )}
    />
  );
}
