import React from 'react';
import { View } from 'react-native';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import AddComment from './comments/AddComment';
import CommentsList from './comments/CommentsList';

interface CommentsTaskDetailsProps {
  data: getTaskByID_getTaskByID | undefined;
}

export default function CommentsTaskDetails({
  data,
}: CommentsTaskDetailsProps) {
  return (
    <View>
      <CommentsList dataTask={data} />
      <AddComment data={data} />
    </View>
  );
}
