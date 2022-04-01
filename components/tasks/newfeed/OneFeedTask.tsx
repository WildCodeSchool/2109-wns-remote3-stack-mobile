import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment';
import { Image } from 'react-native-elements';
import { getNewFeedTask_getAllNotificationsFromObject } from '../../../API/types/getNewFeedTask';

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
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});
export default function OneFeedTask({ item, projectName }: OneFeedTaskProps) {
  return (
    <View style={[styles.container, tw`w-full mb-5`]}>
      <View style={tw`flex-row w-full items-center pb-2`}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
          }}
        />
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
