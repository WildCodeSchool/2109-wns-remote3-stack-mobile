import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { useMutation, useQuery } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';
import DefaultAvatar from '../DefaultAvatar';
import { getProjectByIdId_getProjectByID_members } from '../../API/types/getProjectByIdId';
import {
  DELETE_USER_PROJECT,
  GET_ONE_PROJECT,
} from '../../API/queries/projectQueries';
import Loader from '../Loader';
import { GetUserByID } from '../../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../../API/queries/userQueries';

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  text: {
    color: '#8790E0',
  },
  container: {
    backgroundColor: '#15192C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#8790E0',
    paddingBottom: 1,
  },
  backgroundButton: {
    backgroundColor: '#8790E0',
  },
  button: {
    width: '100%',
    backgroundColor: 'red',
    height: 80,
    marginVertical: 5,
  },
});

interface IProps {
  data: getProjectByIdId_getProjectByID_members;
  projectId: string;
  userId: string;
  isProjectManager: boolean;
}

export default function UsersAssign({
  data,
  isProjectManager,
  projectId,
  userId,
}: IProps) {
  const navigation = useNavigation();

  const {
    data: user,
    loading,
    error,
  } = useQuery<GetUserByID>(GET_USER_BY_ID, {
    variables: { getUserByIdId: data.userId },
  });

  const [deleteUserProject, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER_PROJECT, {
      variables: { projectId, userId },
      refetchQueries: [GET_ONE_PROJECT],
    });

  if (deleteLoading || loading) {
    return <Loader />;
  }
  if (deleteError || !user || error) {
    return <Text>error</Text>;
  }

  return (
    <SwipeProvider>
      <SwipeItem
        style={styles.button}
        swipeContainerStyle={styles.container}
        rightButtons={
          <SwipeButtonsContainer
            style={{
              alignSelf: 'center',
              aspectRatio: 1,
              flexDirection: 'column',
              padding: 10,
            }}
          >
            {isProjectManager && (
              <Pressable onPress={() => deleteUserProject()}>
                <Entypo name="trash" size={24} color="white" />
              </Pressable>
            )}
          </SwipeButtonsContainer>
        }
      >
        <Pressable
          style={tw` w-2/12`}
          onPress={() => navigation.navigate('Userprofil', { id: userId })}
        >
          {user.getUserByID.avatar ? (
            <Image
              style={styles.image}
              source={{
                uri: user.getUserByID.avatar,
              }}
            />
          ) : (
            <DefaultAvatar
              userId={userId}
              userFirstName={user.getUserByID.firstName}
            />
          )}
        </Pressable>
        <View style={tw`flex flex-row items-start  justify-between w-10/12`}>
          <View>
            <Text style={[tw`text-base font-bold`, styles.text]}>
              {user.getUserByID.firstName} {user.getUserByID.lastName}
            </Text>
            <Text style={[tw`text-sm text-gray-400`]}>
              {user.getUserByID.email}
            </Text>
          </View>

          <View style={tw`flex flex-col items-end`}>
            <Text style={tw`mt-1 text-xs text-green-400 mr-1`}>
              {data.projectRole}
            </Text>
          </View>
        </View>
      </SwipeItem>
    </SwipeProvider>
  );
}
