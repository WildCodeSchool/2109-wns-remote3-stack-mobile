import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { AntDesign, Entypo } from '@expo/vector-icons';
import dateFormat from 'dateformat';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getProjectByIdId_getProjectByID } from '../../API/types/getProjectByIdId';
import Status from '../Status';
import { RootStackParamList } from '../../types';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#8790E0',
    padding: 15,
    borderRadius: 10,
  },
});

interface IProps {
  project: getProjectByIdId_getProjectByID;
}

type DeleteProject = StackNavigationProp<RootStackParamList, 'DeleteProject'>;
type ProjectScreenProps = StackNavigationProp<
  RootStackParamList,
  'CreateUpdateproject'
> &
  DeleteProject;

export default function ProjectInformations({ project }: IProps) {
  const navigation = useNavigation<ProjectScreenProps>();

  return (
    <View style={styles.container}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Status status={project.status} />
        <View style={tw`flex flex-row`}>
          <Pressable
            onPress={() =>
              navigation.navigate('CreateUpdateproject', { id: project.id })
            }
          >
            <AntDesign style={tw`mr-2`} name="edit" size={25} color="white" />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('DeleteProject', { id: project.id })
            }
          >
            <Entypo name="trash" size={22} color="white" />
          </Pressable>
        </View>
      </View>
      <Text style={tw`text-white mt-4`}>
        Due date : {dateFormat(new Date(project.endDate), 'dddd dd mmmm yyyy')}
      </Text>
      <Text style={tw`text-white  mt-1`}>
        StartDate :{' '}
        {dateFormat(new Date(project.startDate), 'dddd dd mmmm yyyy')}
      </Text>
    </View>
  );
}
