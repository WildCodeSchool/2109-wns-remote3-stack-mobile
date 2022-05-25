import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { getProjectByIdId } from '../../../API/types/getProjectByIdId';
import User from '../../../components/projects/User';
import { useUserFromStore } from '../../../store/slices/user.slice';
import { GET_ONE_PROJECT } from '../../../API/queries/projectQueries';
import { GET_ALL_USERS } from '../../../API/queries/userQueries';
import { GetAllUsers } from '../../../API/types/GetAllUsers';
import CloseModal from '../../../components/CloseModal';
import UsersAssign from '../../../components/projects/UsersAssign';
import Loader from '../../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  buttonActive: {
    backgroundColor: '#8790E0',
  },
  navigationContainer: {
    borderWidth: 2,
    borderColor: '#8790E0',
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function AssignedUser() {
  const { user } = useUserFromStore();
  const [isManageUser, setIsManageUser] = useState(false);
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [isProjectManager, setIsProjectManager] = useState(false);
  const {
    loading: usersLoading,
    error: usersError,
    data: usersList,
  } = useQuery<GetAllUsers>(GET_ALL_USERS);

  const { loading, error, data } = useQuery<getProjectByIdId>(GET_ONE_PROJECT, {
    variables: { getProjectByIdId: id },
    onCompleted: (d) => {
      const isUserManageProject = d.getProjectByID.members.filter(
        (item) => item.userId === user.id
      );

      if (isUserManageProject.length > 0) {
        if (isUserManageProject[0].projectRole === 'PROJECT_MANAGER') {
          setIsProjectManager(true);
        }
      }
    },
  });

  if (loading || usersLoading) {
    return <Loader />;
  }
  if (error || !data || usersError || !usersList) {
    return <Text>error</Text>;
  }

  return (
    <View style={[tw`px-4 py-5`, styles.container]}>
      <CloseModal path="ProjectDetails" id={id} />
      {isProjectManager && (
        <View
          style={[
            tw`flex flex-row rounded-lg justify-between mb-3`,
            styles.navigationContainer,
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsManageUser(false)}
            style={[
              tw`py-2 px-3 rounded-sm w-6/12`,
              !isManageUser && styles.buttonActive,
            ]}
          >
            <Text style={tw`text-white text-center`}>Assigned Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsManageUser(true)}
            style={[
              tw`py-2 px-3 rounded-sm w-6/12`,
              isManageUser && styles.buttonActive,
            ]}
          >
            <Text style={tw`text-white text-center`}>Add users</Text>
          </TouchableOpacity>
        </View>
      )}
      {isManageUser ? (
        <FlatList
          data={usersList.getAllUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <User
              usersProject={data.getProjectByID.members}
              user={item}
              projectId={data.getProjectByID.id}
              setIsManageUser={setIsManageUser}
            />
          )}
        />
      ) : (
        <FlatList
          data={data?.getProjectByID.members}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <UsersAssign
              isProjectManager={isProjectManager}
              projectId={data.getProjectByID.id}
              data={item}
              userId={item.userId}
            />
          )}
        />
      )}
    </View>
  );
}
