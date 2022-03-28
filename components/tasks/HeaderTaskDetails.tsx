import React from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';

interface HeaderTaskDetailsProps {
  data: getTaskByID_getTaskByID | undefined;
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

export default function HeaderTaskDetails({ data }: HeaderTaskDetailsProps) {
  const navigation = useNavigation();

  return (
    <View
      style={tw`flex-row w-full mb-2 mt-10 px-5 items-center justify-between`}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Root')}
        style={tw`h-16 flex flex-row items-center`}
      >
        <AntDesign name="left" size={24} color="#8790E0" style={tw`mr-1`} />
        <Text style={styles.title}> {data ? data.name : `TaskDetails`} </Text>
        <Pressable
          style={tw`ml-2`}
          onPress={() => navigation.navigate('DeleteTask', { id: data?.id })}
        >
          <Entypo name="trash" size={15} color="white" />
        </Pressable>
      </TouchableOpacity>

      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        }}
      />
    </View>
  );
}
