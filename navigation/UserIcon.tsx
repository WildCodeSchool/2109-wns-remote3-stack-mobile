import { View, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useUserFromStore } from '../store/slices/user.slice';
import DefaultAvatar from '../components/DefaultAvatar';

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
});

type ProfilScreenProp = StackNavigationProp<RootStackParamList, 'Userprofil'>;

export default function UserIcon() {
  const navigation = useNavigation<ProfilScreenProp>();

  const { user } = useUserFromStore();

  return (
    <View style={tw`flex-1 flex px-5 py-5`}>
      <Pressable
        onPress={() => navigation.navigate('Userprofil', { id: user.id })}
      >
        {user.avatar ? (
          <Image
            style={styles.image}
            source={{
              uri: user.avatar,
            }}
          />
        ) : (
          <DefaultAvatar
            userId={user.id as string}
            userFirstName={user.firstName as string}
          />
        )}
      </Pressable>
    </View>
  );
}
