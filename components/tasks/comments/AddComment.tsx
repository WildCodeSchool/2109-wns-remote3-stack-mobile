import React from 'react';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Loader';
import {
  CREATE_COMMENTS,
  GET_ALL_COMMENTS,
} from '../../../API/mutation/Comments';
import { GetOneTask } from '../../../API/queries/taskQueries';
import { GetUserByID_getUserByID } from '../../../API/types/GetUserByID';

interface AddCommentProps {
  idTask: string;
}
const styles = StyleSheet.create({
  input: {
    color: '#8790E0',
    backgroundColor: '#15192C',
    marginRight: 20,
    paddingBottom: 8,
  },
  contentInput: {
    borderColor: '#8790E0',
    borderWidth: 1,
    borderRadius: 5,
    width: 360,
  },
});

export default function AddComment({ idTask }: AddCommentProps) {
  const { handleSubmit, control } = useForm();
  const navigation = useNavigation();

  const user = useSelector(
    (state: { user: GetUserByID_getUserByID }) => state.user
  );

  // Create comment
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENTS, {
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
  if (loading) return <Loader />;
  if (error) return <Text>{error.message}</Text>;

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const dataComments = {
      text: d.text,
      taskId: idTask,
      userId: user.id,
    };
    createComment({ variables: dataComments });
  };
  return (
    <View
      style={[
        styles.contentInput,
        tw`py-2 px-3 mt-6 flex absolute bottom-12 w-11/12 flex-row justify-between ml-3 items-center rounded-md`,
      ]}
    >
      <Controller
        name="text"
        control={control}
        render={({ field: { onChange, value } }: FieldValues) => (
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={10}
            placeholderTextColor="#8790E0"
            placeholder="Add a comment..."
            value={value}
            onChangeText={(newText) => onChange(newText)}
          />
        )}
      />
      <Pressable
        style={{
          transform: [{ rotate: '40deg' }],
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <View>
          <Ionicons name="paper-plane-outline" size={20} color="white" />
        </View>
      </Pressable>
    </View>
  );
}