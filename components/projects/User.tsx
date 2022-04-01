import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { getProjectByIdId_getProjectByID_members } from '../../API/types/getProjectByIdId';
import { GetUserByID } from '../../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../../API/queries/userQueries';
import Loader from '../Loader';
import DefaultAvatar from '../DefaultAvatar';

interface IProps {
  user: getProjectByIdId_getProjectByID_members;
}

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  text: {
    color: '#8790E0',
  },
  border: {
    borderColor: '#8790E0',
  },
});

export default function User({ user }: IProps) {
  const navigation = useNavigation();
  const { data, loading, error } = useQuery<GetUserByID>(GET_USER_BY_ID, {
    variables: { getUserByIdId: user.userId },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <View
      style={[
        tw`flex flex-row items-center w-full border-b  pb-3 mb-4`,
        styles.border,
      ]}
    >
      <Pressable
        style={tw` w-2/12`}
        onPress={() => navigation.navigate('Userprofil')}
      >
        {data.getUserByID.avatar ? (
          <Image
            style={styles.image}
            source={{
              uri: data.getUserByID.avatar,
            }}
          />
        ) : (
          <DefaultAvatar userFirstName={data.getUserByID.firstName} />
        )}
      </Pressable>
      <View style={tw`flex flex-row  justify-between w-10/12`}>
        <View>
          <Text style={[tw`text-base font-bold`, styles.text]}>
            {data.getUserByID.firstName} {data.getUserByID.lastName}
          </Text>
          <Text style={[tw`text-sm text-gray-400`]}>
            {data.getUserByID.email}
          </Text>
        </View>
        <Text style={tw`mt-1 text-xs text-green-400 mr-1`}>
          {user.projectRole}
        </Text>
      </View>
    </View>
  );
}
