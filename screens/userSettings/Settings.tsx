import { useQuery } from '@apollo/client';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GET_USER_BY_ID } from '../../API/queries/userQueries';
import { GetUserByID } from '../../API/types/GetUserByID';
import Loader from '../../components/Loader';
import SettingsHeader from '../../components/userSettings/SettingsHeader';
import ProfilPicture from '../../components/userSettings/ProfilPicture';
import UpdateInfosUser from '../../components/userSettings/UpdateInfosUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: -20,
  },
});

type RootStackParam = {
  id: { id: string };
};
function Settings() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;

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
    <View style={[styles.container, tw`w-full`]}>
      <SettingsHeader userId={user.getUserByID.id} />
      <View style={tw`w-full flex flex-col items-center mt-2`}>
        <ProfilPicture
          userFirstName={user.getUserByID.firstName}
          userAvatarUrl={user.getUserByID.avatar}
          userId={id}
        />
        <View style={tw`text-white flex flex-row mt-5`}>
          <Text style={tw`text-white font-bold text-xl mr-1`}>
            {user.getUserByID.firstName.charAt(0).toUpperCase() +
              user.getUserByID.firstName.substr(1)}
          </Text>
          <Text style={tw`text-white font-bold text-xl`}>
            {user.getUserByID.lastName.charAt(0).toUpperCase() +
              user.getUserByID.lastName.substr(1)}
          </Text>
        </View>
        <Text style={tw`text-white mt-1 text-xl opacity-80`}>
          {user.getUserByID.email}
        </Text>
      </View>
      <UpdateInfosUser userId={id} />
    </View>
  );
}

export default Settings;
