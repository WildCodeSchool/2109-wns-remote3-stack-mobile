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
  textHeader: {
    color: '#8790E0',
  },
});

export default function SettingsHeader({ userId }: IProps) {
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
    <View
      style={tw`flex flex-row w-full justify-between px-2 pr-3 items-center`}
    >
      <View style={tw`flex flex-row justify-between  items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Userprofil', { id: userId })}
          style={tw`h-16 flex flex-row items-center mr-3`}
        >
          <AntDesign name="left" size={32} color="#8790E0" style={tw``} />
        </TouchableOpacity>
        <Text style={[tw`text-3xl font-bold`, styles.textHeader]}>
          Settings
        </Text>
      </View>
      {userId === userFromStore.id && (
        <TouchableOpacity
          style={[tw`flex flex-row items-center justify-end  mt-2 rounded-md`]}
          onPress={() => logoutMutation()}
        >
          <Text style={tw`text-white text-sm font-bold`}>LogOut</Text>
          <AntDesign style={[tw`ml-2`]} name="logout" size={12} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
