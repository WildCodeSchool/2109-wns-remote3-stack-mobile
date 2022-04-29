import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import tw from 'tailwind-react-native-classnames';
import { useUserFromStore } from '../../store/slices/user.slice';
import { LOGOUT_MUTATION } from '../../API/mutation/logout';

interface IProps {
  userId: string;
}

const styles = StyleSheet.create({
  backgroundButton: {
    backgroundColor: '#8790E0',
  },
});

export default function UserProfilHeader({ userId }: IProps) {
  const { user: userFromStore } = useUserFromStore();
  const navigation = useNavigation();
  const { dispatchLogout } = useUserFromStore();
  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      SecureStore.deleteItemAsync('token');
      dispatchLogout();
    },
  });
  return (
    <View style={tw`flex flex-row w-full justify-between  items-center`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Root')}
        style={tw`h-16 flex flex-row items-center mr-1`}
      >
        <AntDesign name="left" size={32} color="#8790E0" style={tw``} />
      </TouchableOpacity>
      {userId === userFromStore.id && (
        <View style={tw` flex flex-row`}>
          <TouchableOpacity
            style={[
              tw`flex flex-row items-center px-4 mr-5 py-2 rounded-md`,
              styles.backgroundButton,
            ]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={tw`text-white text-sm mr-1 font-bold`}>
              Edit profil
            </Text>
            <AntDesign name="edit" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row items-center justify-center px-4 py-2 rounded-md`,
              styles.backgroundButton,
            ]}
            onPress={() => logoutMutation()}
          >
            <Text style={tw`text-white text-sm mr-1 font-bold`}>LogOut</Text>
            <AntDesign name="logout" size={12} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
