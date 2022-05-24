import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import tw from 'tailwind-react-native-classnames';
import { GET_USER_WITH_TASKS } from '../../API/queries/userQueries';
import { GetUserWithTasks } from '../../API/types/GetUserWithTasks';
import OneTask from '../tasks/OneTask';
import CardListLoader from '../animated/cardsLoader/CardListLoader';

const styles = StyleSheet.create({
  flatlist: {
    height: '75%',
    flexGrow: 0,
    paddingHorizontal: 14,
  },
});

interface IProps {
  userId: string;
}

export default function UsersTasks({ userId }: IProps) {
  const { data, loading, error } = useQuery<GetUserWithTasks>(
    GET_USER_WITH_TASKS,
    {
      variables: { getUserWithTasksId: userId },
    }
  );

  if (loading) {
    return <CardListLoader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }
  return (
    <View style={[tw`pb-5`, styles.flatlist]}>
      <FlatList
        contentInset={{ bottom: 130 }}
        data={data.getUserWithTasks.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OneTask item={item} />}
      />
    </View>
  );
}
