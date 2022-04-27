import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { useMutation } from '@apollo/client';
import RNPickerSelect from 'react-native-picker-select';
import { getProjectByIdId_getProjectByID_members } from '../../API/types/getProjectByIdId';
import DefaultAvatar from '../DefaultAvatar';
import { GetAllUsers_getAllUsers } from '../../API/types/GetAllUsers';
import {
  CREATE_USER_PROJECT,
  GET_ONE_PROJECT,
} from '../../API/queries/projectQueries';
import Loader from '../Loader';

interface IProps {
  user: GetAllUsers_getAllUsers;
  usersProject: getProjectByIdId_getProjectByID_members[];
  projectId: string;
  setIsManageUser: Dispatch<SetStateAction<boolean>>;
}

const pickerStyle = StyleSheet.create({
  inputIOS: {
    color: '#8790E0',
    width: 180,
    backgroundColor: 'transparent',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8790E0',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginTop: 10,
    height: 32,
    textAlign: 'left',
    fontSize: 14,
  },
  inputAndroid: {
    color: '#8790E0',
    backgroundColor: '#8790E0',
    borderRadius: 6,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginTop: 10,
    height: 32,
    textAlign: 'left',
    fontSize: 14,
  },
  underline: { borderTopWidth: 0 },
});

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  text: {
    color: '#8790E0',
  },
  border: {
    borderColor: '#8790E0',
  },
  backgroundButton: {
    backgroundColor: '#8790E0',
  },
});

export default function User({
  user,
  usersProject,
  projectId,
  setIsManageUser,
}: IProps) {
  const [isUserInProject, setIsUserInProject] = useState(false);
  const [isSelectRole, setIsSelectRole] = useState(false);
  const [roleSelected, setRoleSelected] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (usersProject.filter((item) => item.userId === user.id).length > 0) {
      setIsUserInProject(true);
    }
  }, []);

  const [createUserProject, { loading: createLoading, error: createError }] =
    useMutation(CREATE_USER_PROJECT, {
      variables: {
        userId: user.id,
        projectId,
        projectRole: roleSelected,
      },
      refetchQueries: [GET_ONE_PROJECT],
      onCompleted: () => {
        setIsManageUser(false);
      },
    });

  const projectRole = [
    'DEVELOPPER',
    'UX_DESIGNER',
    'DEVOPS',
    'PROJECT_MANAGER',
  ];

  const OnAssign = () => {
    if (isSelectRole) {
      createUserProject();
    } else {
      setIsSelectRole(true);
    }
  };

  if (createLoading) {
    return <Loader />;
  }
  if (createError) {
    return <Text>error</Text>;
  }

  return (
    <View>
      {!isUserInProject && (
        <View
          style={[
            tw`flex flex-row items-start w-full border-b  pb-3 my-2`,
            styles.border,
          ]}
        >
          <Pressable
            style={tw` w-2/12`}
            onPress={() => navigation.navigate('Userprofil', { id: user.id })}
          >
            {user.avatar ? (
              <Image
                style={styles.image}
                source={{
                  uri: user.avatar,
                }}
              />
            ) : (
              <DefaultAvatar userId={user.id} userFirstName={user.firstName} />
            )}
          </Pressable>
          <View style={tw`flex flex-row items-end  justify-between w-10/12`}>
            <View>
              <Text style={[tw`text-base font-bold`, styles.text]}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={[tw`text-sm text-gray-400`]}>{user.email}</Text>
              {isSelectRole && (
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{
                    label: 'Select Role',
                  }}
                  value={roleSelected}
                  onValueChange={(value) => {
                    setRoleSelected(value);
                    setIsSelectRole(true);
                  }}
                  items={projectRole.map((item) => {
                    return { label: item, value: item };
                  })}
                />
              )}
            </View>
            <View>
              <Pressable
                onPress={() => OnAssign()}
                style={[tw`py-2 px-5 rounded`, styles.backgroundButton]}
              >
                <Text style={tw`text-white`}>Assign</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
