import { useNavigation } from '@react-navigation/native';
import React from 'react';
import dateFormat from 'dateformat';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useQuery } from '@apollo/client';
import { GetAllNotifications_getAllNotifications } from '../../API/types/GetAllNotifications';
import { GetUserByID } from '../../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../../API/queries/userQueries';
import DefaultAvatar from '../DefaultAvatar';
import SkeletonCard from '../animated/newsFeedLoaders/OneFeedLoader';

interface IProps {
  item: GetAllNotifications_getAllNotifications;
}
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  container: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
});

function OneNotification({ item }: IProps) {
  const navigation = useNavigation();

  const actionType: Record<string, string> = {
    ADDED: 'created',
    EDITED: 'edited',
    DELETED: 'deleted',
  };
  const objectType: Record<string, string> = {
    COMMENT: 'comment',
    PROJECT: 'project',
    TASK: 'task',
  };

  const {
    data: user,
    loading,
    error,
  } = useQuery<GetUserByID>(GET_USER_BY_ID, {
    variables: { getUserByIdId: item.editorId },
  });

  // TODO: Delete all the notifactions of deleted items test comments navigation and add status on task and project
  const handleNavigate = () => {
    if (
      objectType[item.type] === 'task' &&
      actionType[item.actionType] !== 'deleted'
    ) {
      navigation.navigate('TaskDetails', { id: item.modifiedObjectId });
    }
    if (
      objectType[item.type] === 'project' &&
      actionType[item.actionType] !== 'deleted'
    ) {
      navigation.navigate('ProjectDetails', { id: item.modifiedObjectId });
    }
    if (
      objectType[item.type] === 'comment' &&
      actionType[item.actionType] !== 'deleted'
    ) {
      navigation.navigate('TaskDetails', { id: item.onId as string });
    }
  };

  if (loading) {
    return <SkeletonCard />;
  }
  if (!user || error) {
    return <Text>error</Text>;
  }

  return (
    <View
      style={[tw`flex flex-row items-start  mt-5 mx-2  pb-3`, styles.container]}
    >
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

      <TouchableOpacity onPress={() => handleNavigate()} style={tw`ml-3`}>
        <View style={tw`flex flex-row`}>
          <Text style={tw`text-white text-sm font-bold`}>
            {item.editorName}{' '}
          </Text>
          <Text style={tw`text-white text-sm`}>
            {actionType[item.actionType]} a{' '}
          </Text>
          <Text style={tw`text-white text-sm font-bold`}>
            {objectType[item.type]}{' '}
          </Text>
        </View>
        <Text style={tw`text-white text-xs mt-1`}>
          {dateFormat(new Date(item.createdAt), 'dd/mm/yy')}
        </Text>
        <View style={tw`flex flex-row items-center mt-3`}>
          {objectType[item.type] === 'task' && (
            <Text style={tw`text-white`}>task name:</Text>
          )}
          {objectType[item.type] === 'project' && (
            <Text style={tw`text-white`}>project name:</Text>
          )}
          {objectType[item.type] === 'comment' && (
            <Text style={tw`text-white`}>task name:</Text>
          )}
          <Text style={tw`text-white text-xs font-bold ml-1`}>
            {item.modifiedObjectName}{' '}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default OneNotification;
