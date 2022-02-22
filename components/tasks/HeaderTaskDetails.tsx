import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
// eslint-disable-next-line camelcase
import { getProjectByIdId_getProjectByID_tasks } from '../../API/types/getProjectByIdId';

interface HeaderTaskDetailsProps {
  // eslint-disable-next-line camelcase
  getTaskByID: getProjectByIdId_getProjectByID_tasks;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  title: {
    color: '#8790E0',
    fontSize: 24,
  },
});
// eslint-disable-next-line camelcase
export default function HeaderTaskDetails({
  getTaskByID,
}: // eslint-disable-next-line camelcase
HeaderTaskDetailsProps) {
  return (
    <View style={tw`flex-row w-full mb-2 px-5 items-center justify-between`}>
      <View>
        <Text style={styles.title}>
          {getTaskByID ? getTaskByID.name : `TaskDetails`}
        </Text>
        <Text style={styles.title}>Tags</Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        }}
      />
    </View>
  );
}
