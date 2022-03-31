import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { GetOneTask } from '../../API/queries/taskQueries';
import Loader from '../../components/Loader';
import { DELETE_COMMENT, GET_ALL_COMMENTS } from '../../API/mutation/Comments';
import { GET_ONE_COMMENT } from '../../API/queries/Comment';
import { getOneComment } from '../../API/types/getOneComment';

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
  id: { id: string | undefined };
};

type TaskScreenProps = StackNavigationProp<
  RootStackParamList,
  'CommentsTaskDetails'
>;

export default function DeleteComment() {
  const navigation = useNavigation<TaskScreenProps>();
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;

  const { loading, error, data } = useQuery<getOneComment>(GET_ONE_COMMENT, {
    variables: { getCommentByIdId: id },
  });

  const idTask = data?.getCommentByID.taskId;

  const [deleteComment, { loading: deleteLoad, error: deleteError }] =
    useMutation(DELETE_COMMENT, {
      refetchQueries: [
        GET_ALL_COMMENTS,
        {
          query: GetOneTask,
          variables: { id: idTask },
        },
      ],
      onCompleted: () => {
        navigation.navigate('CommentsTaskDetails', { id: idTask });
      },
    });

  if (loading || deleteLoad) {
    return <Loader />;
  }
  if (error || !data || deleteError) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={tw`flex`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          Are you sure you want to delete tgis comment ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteComment({
              variables: { deleteCommentByIdId: data.getCommentByID.id },
            });
          }}
          style={[tw`w-full p-4 rounded-md my-4 mt-10`, styles.button]}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CommentsTaskDetails', { id })}
          style={[tw`w-full p-4 rounded-md my-4`, styles.button]}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
