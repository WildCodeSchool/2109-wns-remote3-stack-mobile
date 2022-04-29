import { Pressable, StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { getTaskByID_getTaskByID_users } from '../../API/types/getTaskByID';
import DefaultAvatar from '../DefaultAvatar';

interface IProps {
  user: getTaskByID_getTaskByID_users;
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  container: {
    borderColor: '#8790E0',
  },
});

export default function AssignTaskUser({ user }: IProps) {
  const navigation = useNavigation();

  return (
    <View
      style={[tw`my-3 border-b pb-4 items-center flex-row`, styles.container]}
    >
      {user.avatar ? (
        <Pressable
          onPress={() => {
            navigation.navigate('Userprofil', { id: user.id });
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: user.avatar as string,
            }}
          />
        </Pressable>
      ) : (
        <DefaultAvatar
          userId={user.id}
          userFirstName={user.firstName as string}
        />
      )}
      <View style={tw`ml-2 flex flex-row`}>
        <Text style={tw`font-bold text-lg text-white`}>{user.firstName}</Text>
        <Text style={tw`ml-1 font-bold text-lg text-white`}>
          {user.lastName}
        </Text>
      </View>
    </View>
  );
}
