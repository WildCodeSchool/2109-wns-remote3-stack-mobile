import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useQuery } from '@apollo/client';
import dateFormat from 'dateformat';
import { GET_USER_BY_ID } from '../../../API/queries/userQueries';

interface OneCommentProps {
  item: any;
}

const styles = StyleSheet.create({
  comments: {
    backgroundColor: '#15192C',
    borderRadius: 5,
    width: 360,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
export default function OneComment({ item }: OneCommentProps) {
  // Get User Comment
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: item.userId,
    },
  });
  if (loadingUser) return null;
  if (errorUser) {
    return <Text> error </Text>;
  }
  return (
    <View>
      <View style={[tw`flex-row mt-3 ml-6`]}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
          }}
        />
        <Text style={[tw`text-white font-bold ml-2`]}>
          {dataUser.getUserByID.lastName}
        </Text>
        <Text style={[tw`text-white opacity-80 ml-2`]}>
          {dateFormat(new Date(item.createdAt), 'dddd dd mmmm yyyy')}
        </Text>
      </View>
      <View style={[styles.comments, tw`text-white p-2 mt-4 ml-4`]}>
        <Text style={tw`text-white`}>{item.text}</Text>
      </View>
    </View>
  );
}
