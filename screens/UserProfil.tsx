import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import UserProfilNavigation from '../components/userProfil/UserProfilNavigation';
import { GetUserByID } from '../API/types/GetUserByID';
import { GET_USER_BY_ID } from '../API/queries/userQueries';
import UserProfilHeader from '../components/userProfil/UserProfilHeader';
import ProfilPicture from '../components/userProfil/ProfilPicture';
import UsersProjects from '../components/userProfil/UsersProjects';
import UsersTasks from '../components/userProfil/UsersTasks';
import PageLoader from '../components/animated/pageLoader/PageLoader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 40,
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
    return <PageLoader />;
  }
  if (error || !user) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <UserProfilHeader userId={user.getUserByID.id} />

      <View style={tw`flex flex-row items-center mt-2 w-11/12`}>
        <ProfilPicture
          userFirstName={user.getUserByID.firstName}
          userAvatarUrl={user.getUserByID.avatar}
        />
        <View style={tw`ml-2`}>
          <View style={tw`text-white flex flex-row `}>
            <Text style={tw`text-white font-bold text-xl mr-1`}>
              {user.getUserByID.firstName}
            </Text>
            <Text style={tw`text-white font-bold text-xl`}>
              {user.getUserByID.lastName}
            </Text>
          </View>
          <Text style={tw`text-white  text-xl`}>{user.getUserByID.email}</Text>
        </View>
      </View>
      <UserProfilNavigation nav={nav} setNav={setNav} />
      {nav === 'projects' && <UsersProjects userId={id} />}
      {nav === 'tasks' && <UsersTasks userId={id} />}
    </View>
  );
}
