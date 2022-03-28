import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { getTaskByID_getTaskByID } from '../../../API/types/getTaskByID';
import { GET_ALL_COMMENTS } from '../../../API/mutation/Comments';
import Loader from '../../Loader';
import OneComment from './OneComment';

interface CommentsListProps {
  dataTask: getTaskByID_getTaskByID | undefined;
}

const styles = StyleSheet.create({
  flatlist: {
    height: 250,
    flexGrow: 0,
  },
});

export default function CommentsList({ dataTask }: CommentsListProps) {
  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text> error </Text>;
  }

  const commentsTaskId = data.getAllComments.filter((comments: any) => {
    return comments.taskId.includes(dataTask?.id);
  });

  const renderItem = ({ item }: { item: any }) => <OneComment item={item} />;

  return (
    <View>
      <FlatList
        style={styles.flatlist}
        data={commentsTaskId}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
