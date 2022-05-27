import { useMutation, useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { UPDATE_TASK } from '../../API/mutation/Task';
import { GetOneTask } from '../../API/queries/taskQueries';
import { getTaskByID } from '../../API/types/getTaskByID';
import CloseModal from '../../components/CloseModal';
import Loader from '../../components/Loader';
import AssignTaskUser from '../../components/tasks/AssignTaskUser';
import { useUserFromStore } from '../../store/slices/user.slice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  btn: {
    backgroundColor: '#8790E0',
  },
  userList: {
    height: '80%',
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function AssignUsersTaskDetails() {
  const { user } = useUserFromStore();
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;
  const [isAlreadyAssign, setIsAlreadyAssign] = useState(false);
  const navigation = useNavigation();

  const { data, loading, error } = useQuery<getTaskByID>(GetOneTask, {
    variables: { taskId: id },
    onCompleted: (d) => {
      const checkUserInAssignUserlist = d.getTaskByID.users.filter(
        (u) => u.id === user.id
      );
      if (checkUserInAssignUserlist.length > 0) {
        setIsAlreadyAssign(true);
      }
    },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }
  const [updateTask, { error: updateError }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      navigation.navigate('TaskDetails', { id: data.getTaskByID.id });
    },
    refetchQueries: [
      {
        query: GetOneTask,
        variables: { taskId: id },
      },
    ],
  });
  if (updateError)
    return <Text style={tw`text-white mb-2`}>{updateError.message}</Text>;

  const AssignSelf = () => {
    const tagsWithoutTypename = data?.getTaskByID.tags.map((tag) => {
      const { __typename, ...item } = tag;
      return item;
    });
    const UsersWithoutTypename = data?.getTaskByID.users.map((u) => {
      const { __typename, ...item } = u;
      return item.id;
    });

    const removeUser = UsersWithoutTypename.filter(
      (userId) => userId !== user.id
    );

    const addUser = [...UsersWithoutTypename, user.id];

    const dataTaskUpdate = {
      name: data.getTaskByID.name,
      description: data.getTaskByID.description,
      projectId: data.getTaskByID.projectId,
      advancement: data.getTaskByID.advancement,
      endDate: data.getTaskByID.endDate,
      tags: tagsWithoutTypename,
      userIds: isAlreadyAssign ? removeUser : addUser,
      estimeeSpentTime: data.getTaskByID.estimeeSpentTime,
      updateTaskWithTagsByIdId: data.getTaskByID.id,
    };

    updateTask({ variables: dataTaskUpdate });
  };

  return (
    <View style={[tw`px-4 py-5`, styles.container]}>
      <CloseModal path="TaskDetails" id={id} />
      <View style={styles.userList}>
        <FlatList
          contentInset={{ bottom: 130 }}
          data={data.getTaskByID.users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AssignTaskUser user={item} />}
        />
      </View>
      {!isAlreadyAssign ? (
        <TouchableOpacity
          onPress={() => {
            AssignSelf();
          }}
          style={[tw`py-3 rounded-md `, styles.btn]}
        >
          <Text style={tw`text-white text-center text-xl font-bold`}>
            Assign myself this task
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            AssignSelf();
          }}
          style={[tw`py-3 rounded-md `, styles.btn]}
        >
          <Text style={tw`text-white text-center text-xl font-bold`}>
            Unassigned me from this task
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
