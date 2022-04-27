import { FlatList, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useQuery } from '@apollo/client';
import { GET_USER_WITH_PROJECT } from '../../API/queries/userQueries';
import { GetUserWithProjects } from '../../API/types/GetUserWithProjects';
import Loader from '../Loader';
import Project from './Project';

interface IProps {
  userId: string;
}

const styles = StyleSheet.create({
  flatlist: {
    height: '75%',
    flexGrow: 0,
  },
});

export default function UsersProjects({ userId }: IProps) {
  const { data, loading, error } = useQuery<GetUserWithProjects>(
    GET_USER_WITH_PROJECT,
    {
      variables: { getUserWithProjectsId: userId },
    }
  );

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <View style={[tw`py-5 w-full`, styles.flatlist]}>
      <FlatList
        contentInset={{ bottom: 130 }}
        style={tw``}
        data={data.getUserWithProjects.projects}
        keyExtractor={(item) => item.projectId}
        renderItem={({ item }) => <Project projectId={item.projectId} />}
      />
    </View>
  );
}
