import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { getProjectByIdId } from '../../../API/types/getProjectByIdId';
import User from '../../../components/projects/User';
import { useUserFromStore } from '../../../store/slices/user.slice';
import { GET_ONE_PROJECT } from '../../../API/queries/projectQueries';
import Loader from '../../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  button: {
    backgroundColor: '#8790E0',
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function AssignedUser() {
  const { user } = useUserFromStore();
  const navgation = useNavigation();
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [isProjectManager, setIsProjectManager] = useState(false);

  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
    onCompleted: (d) => {
      const isUserIntheProject = d.getProjectByID.members.filter(
        (item) => item.userId === user.id
      );
      if (isUserIntheProject[0].projectRole === 'PROJECT_MANAGER') {
        setIsProjectManager(true);
      }
    },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <View style={[tw`px-4 py-5`, styles.container]}>
      <Pressable
        onPress={() => navgation.navigate('ProjectDetails', { id })}
        style={tw`flex items-center w-full bg-purple-300 bg-opacity-10 rounded-lg p-2 mb-5`}
      >
        <AntDesign name="caretdown" size={24} color="#8790E0" />
      </Pressable>
      {isProjectManager && (
        <TouchableOpacity
          style={[tw`my-3 mb-5 py-2 px-3 rounded-lg w-6/12`, styles.button]}
        >
          <Text style={tw`text-white text-center`}>Manage users</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={data?.getProjectByID.members}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <User user={item} />}
      />
    </View>
  );
}
