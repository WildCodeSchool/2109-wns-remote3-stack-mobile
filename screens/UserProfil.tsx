import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@apollo/client';
import { RootTabParamList } from '../types';
import { LOGOUT_MUTATION } from '../API/mutation/logout';
import { useUserFromStore } from '../store/slices/user.slice';

export default function UserProfil() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15192C',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const { dispatchLogout } = useUserFromStore();
  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => dispatchLogout(),
  });

  type navigationProps = StackNavigationProp<RootTabParamList, 'Homepage'>;

  const navigation = useNavigation<navigationProps>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
        <Text style={tw`text-white mb-10 bg-blue-800 p-5`}>Back home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logoutMutation()}>
        <Text style={tw`text-white mb-10 bg-red-800 p-5`}>Se déconnecter</Text>
      </TouchableOpacity>
      <Text style={tw`text-white font-bold text-2xl`}>UserProfil</Text>
    </View>
  );
}
