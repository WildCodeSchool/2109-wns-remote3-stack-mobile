import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { GET_ALL_PROJECTS } from '../API/queries/projectQueries';
import OneProject from './projects/OneProject';
import { GetAllProjects } from '../API/types/GetAllProjects';
import Loader from './Loader';
import StatusNavigation from './StatusNavigation';

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
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.95,
    elevation: 18,
  },
  flatlist: {
    height: '88%',
    flexGrow: 0,
  },
});

export default function ProjectListView() {
  const [nav, setNav] = useState('IN_PROGRESS');
  const { loading, error, data } = useQuery<GetAllProjects>(GET_ALL_PROJECTS);
  const navigation = useNavigation();

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <>
      <View style={tw`mx-4 my-2 mb-4`}>
        <StatusNavigation backgroundColor="light" nav={nav} setNav={setNav} />
      </View>
      <FlatList
        contentInset={{ bottom: 130 }}
        style={tw`w-full h-full pl-4 pb-5`}
        data={data.getAllProjects.filter((item) => item.status === nav)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProjectDetails', { id: item.id })
            }
            style={styles.card}
          >
            <OneProject item={item} />
          </TouchableOpacity>
        )}
      />
    </>
  );
}
