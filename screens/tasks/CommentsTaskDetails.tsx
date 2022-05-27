import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import CloseModal from '../../components/CloseModal';
import AddComment from '../../components/tasks/comments/AddComment';
import CommentsList from '../../components/tasks/comments/CommentsList';

type paramsProps = {
  id: { id: string };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
});

export default function CommentsTaskDetails() {
  const route = useRoute<RouteProp<paramsProps>>();

  return (
    <View style={[styles.container, tw`w-full`]}>
      <CloseModal path="TaskDetails" id={route.params.id} />
      <AddComment idTask={route.params.id} />
      <CommentsList idTask={route.params.id} />
    </View>
  );
}
