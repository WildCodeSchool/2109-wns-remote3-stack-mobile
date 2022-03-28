import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GetAllNotifications_getAllNotifications } from '../../API/types/GetAllNotifications';

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

  return (
    <View style={[tw`flex flex-row items-center  my-3 p-2`, styles.container]}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        }}
      />
      <View style={tw`ml-2`}>
        <View style={tw`flex flex-row`}>
          <Text style={tw`text-white font-bold`}>{item.editorName} </Text>
          <Text style={tw`text-white`}>{actionType[item.actionType]} a </Text>
          <Text style={tw`text-white font-bold`}>{objectType[item.type]} </Text>
        </View>
        <View style={tw`flex flex-row items-center mt-2`}>
          {objectType[item.type] === 'task' && (
            <Text style={tw`text-white`}>task name:</Text>
          )}
          {objectType[item.type] === 'project' && (
            <Text style={tw`text-white`}>project name:</Text>
          )}
          <Text style={tw`text-white font-bold ml-1`}>
            {item.modifiedObjectName}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default OneNotification;
