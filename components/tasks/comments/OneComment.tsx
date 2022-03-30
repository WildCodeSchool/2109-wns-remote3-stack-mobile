import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useQuery } from '@apollo/client';
import dateFormat from 'dateformat';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { GET_USER_BY_ID } from '../../../API/queries/userQueries';
import { getOneComment_getCommentByID } from '../../../API/types/getOneComment';
import { GetUserByID_getUserByID } from '../../../API/types/GetUserByID';

interface OneCommentProps {
  item: getOneComment_getCommentByID;
}

const styles = StyleSheet.create({
  comments: {
    borderRadius: 5,
    width: 360,
  },
  container: {
    backgroundColor: '#363C60',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  headerComment: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
});
export default function OneComment({ item }: OneCommentProps) {
  const navigation = useNavigation();

  const user = useSelector(
    (state: { user: GetUserByID_getUserByID }) => state.user
  );

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
    <View style={[styles.container, tw` mt-4 mx-4 w-11/12 rounded-lg`]}>
      <View
        style={[
          styles.headerComment,
          tw`flex-row w-10/12 items-center mt-3 ml-6 pb-1`,
        ]}
      >
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
          }}
        />
        <Text style={[tw`text-white text-sm font-bold ml-2`]}>
          {dataUser.getUserByID.lastName.charAt(0).toUpperCase() +
            dataUser.getUserByID.lastName.slice(1)}
        </Text>
        <Text style={[tw`text-white opacity-80 text-xs ml-2`]}>
          {dateFormat(new Date(item.createdAt), 'dddd dd mmmm yyyy')}
        </Text>
        {item.userId === user.id && (
          <Pressable
            style={tw`ml-2 text-end`}
            onPress={() =>
              navigation.navigate('DeleteComment', {
                id: item.id,
              })
            }
          >
            <Entypo name="trash" size={15} color="white" />
          </Pressable>
        )}
      </View>
      <View style={[styles.comments, tw`text-white w-full p-2 mb-2 ml-4`]}>
        <Text style={tw`text-white`}>{item.text}</Text>
      </View>
    </View>
  );
}
