import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMMENTS } from '../../../API/mutation/Comments';
import Loader from '../../Loader';
import OneComment from './OneComment';
import { GetAllComments_getAllComments } from '../../../API/types/GetAllComments';
import { getOneComment_getCommentByID } from '../../../API/types/getOneComment';

interface CommentsListProps {
  idTask: string | undefined;
}

const styles = StyleSheet.create({
  flatlist: {
    height: '70%',
    marginTop: 20,
    flexGrow: 0,
  },
});

export default function CommentsList({ idTask }: CommentsListProps) {
  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text> error </Text>;
  }

  const commentsTaskId = data.getAllComments.filter(
    (comments: GetAllComments_getAllComments) => {
      return comments.taskId.includes(idTask !== undefined ? idTask : '');
    }
  );

  const renderItem = ({ item }: { item: getOneComment_getCommentByID }) => (
    <OneComment item={item} />
  );

  return (
    <View style={[styles.flatlist]}>
      <FlatList
        data={commentsTaskId.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
