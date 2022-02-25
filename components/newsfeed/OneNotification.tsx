import React from 'react';
import { Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GetAllNotifications_getAllNotifications } from '../../API/types/GetAllNotifications';

interface IProps {
  item: GetAllNotifications_getAllNotifications;
}

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
    <Text style={tw`text-white`}>{`${item.editorName} ${
      actionType[item.actionType]
    } ${objectType[item.type]} ${item.modifiedObjectName}`}</Text>
  );
}

export default OneNotification;
