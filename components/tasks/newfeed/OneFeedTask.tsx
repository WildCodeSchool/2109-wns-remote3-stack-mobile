import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment';
import { Image } from 'react-native-elements';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { getNewFeedTask_getAllNotificationsFromObject } from '../../../API/types/getNewFeedTask';
import { GetUserByID } from '../../../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../../../API/queries/userQueries';
import Loader from '../../Loader';
import DefaultAvatar from '../../DefaultAvatar';

interface OneFeedTaskProps {
  item: getNewFeedTask_getAllNotificationsFromObject;
  projectName: string;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
export default function OneFeedTask({ item, projectName }: OneFeedTaskProps) {
  const navigation = useNavigation();
  const {
    data: user,
    loading,
    error,
  } = useQuery<GetUserByID>(GET_USER_BY_ID, {
    variables: { getUserByIdId: item.editorId },
  });

  if (loading) {
    return <Loader />;
  }
  if (!user || error) {
    return <Text>error</Text>;
  }

  return (
    <View style={[styles.container, tw`w-full mb-5`]}>
      <View style={tw`flex-row w-full items-center pb-2`}>
        {user.getUserByID.avatar ? (
          <Pressable
            onPress={() => {
              navigation.navigate('Userprofil', { id: user.getUserByID.id });
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: user.getUserByID.avatar,
              }}
            />
          </Pressable>
        ) : (
          <DefaultAvatar
            userId={user.getUserByID.id}
            userFirstName={user.getUserByID.firstName as string}
          />
        )}

        <View style={tw`w-full`}>
          <View style={tw`flex-row w-full`}>
            <Text style={tw`text-white font-bold text-lg ml-2`}>
              {item.editorName}
            </Text>
            <Text style={tw`text-white text-lg opacity-80 ml-2`}>
              {item.actionType.toLowerCase()}
            </Text>
            <Text style={tw`text-white text-lg ml-2`}>
              {item.modifiedObjectName}
            </Text>
          </View>
          <Text style={[tw`text-white opacity-80 w-full text-xs ml-2`]}>
            {moment(new Date(item.createdAt)).fromNow()} . {projectName}
          </Text>
        </View>
      </View>
    </View>
  );
}
