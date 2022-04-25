import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import { LOGOUT_MUTATION } from '../API/mutation/logout';
import { useUserFromStore } from '../store/slices/user.slice';
import UserProfilNavigation from '../components/userProfil/UserProfilNavigation';
import { GetUserByID } from '../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../API/queries/userQueries';
import Loader from '../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#8790E0',
  },
  textColor: {
    color: '#8790E0',
  },
  backgroundColor: {
    backgroundColor: '#8790E0',
  },
  defaultAvatar: {
    backgroundColor: '#8790E0',
  },
  letter: {
    fontSize: 70,
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function UserProfil() {
  const { user: userFromStore } = useUserFromStore();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [nav, setNav] = useState('projects');
  const { dispatchLogout } = useUserFromStore();
  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      SecureStore.deleteItemAsync('token');
      dispatchLogout();
    },
  });

  const {
    data: user,
    loading,
    error,
  } = useQuery<GetUserByID>(GET_USER_BY_ID, {
    variables: { getUserByIdId: id },
  });

  const letter = user?.getUserByID.firstName?.split('')[0];

  if (loading) {
    return <Loader />;
  }
  if (error || !user) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={tw`flex flex-row w-full justify-between  items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Root')}
          style={tw`h-16 flex flex-row items-center mr-1`}
        >
          <AntDesign name="left" size={32} color="#8790E0" style={tw``} />
        </TouchableOpacity>
        {user.getUserByID.id === userFromStore.id && (
          <View style={tw`mt-5`}>
            <TouchableOpacity
              style={[
                tw`flex flex-row items-center px-8 py-2 rounded-md`,
                styles.backgroundColor,
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
                tw`flex flex-row items-center justify-end  mt-2 rounded-md`,
              ]}
              onPress={() => logoutMutation()}
            >
              <Text style={tw`text-white text-sm font-bold`}>LogOut</Text>
              <AntDesign
                style={[tw`ml-2`]}
                name="logout"
                size={12}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={tw`w-full flex flex-col items-center mt-2`}>
        {user.getUserByID.avatar ? (
          <Image
            style={styles.image}
            source={{
              uri: user.getUserByID.avatar,
            }}
          />
        ) : (
          <View
            style={[
              tw`h-32 w-32  rounded-full flex items-center justify-center`,
              styles.defaultAvatar,
            ]}
          >
            <Text style={[tw`text-white`, styles.letter]}>{letter}</Text>
          </View>
        )}

        <View style={tw`text-white flex flex-row mt-5`}>
          <Text style={tw`text-white font-bold text-xl mr-1`}>
            {user.getUserByID.firstName}
          </Text>
          <Text style={tw`text-white font-bold text-xl`}>
            {user.getUserByID.lastName}
          </Text>
        </View>
        <Text style={tw`text-white mt-1 text-xl`}>
          {user.getUserByID.email}
        </Text>
      </View>
      <UserProfilNavigation nav={nav} setNav={setNav} />
      {nav === 'projects' && (
        <Text style={tw`text-white font-bold mt-5`}>User Projects List</Text>
      )}
      {nav === 'tasks' && (
        <Text style={tw`text-white font-bold mt-5`}>User Tasks List</Text>
      )}
    </View>
  );
}
