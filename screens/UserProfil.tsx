import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import UserProfilNavigation from '../components/userProfil/UserProfilNavigation';
import { GetUserByID } from '../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../API/queries/userQueries';
import Loader from '../components/Loader';
import UserProfilHeader from '../components/userProfil/UserProfilHeader';
import ProfilPicture from '../components/userProfil/ProfilPicture';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function UserProfil() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [nav, setNav] = useState('projects');

  const {
    data: user,
    loading,
    error,
  } = useQuery<GetUserByID>(GET_USER_BY_ID, {
    variables: { getUserByIdId: id },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !user) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <UserProfilHeader userId={user.getUserByID.id} />

      <View style={tw`w-full flex flex-col items-center mt-2`}>
        <ProfilPicture
          userFirstName={user.getUserByID.firstName}
          userAvatarUrl={user.getUserByID.avatar}
        />

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
