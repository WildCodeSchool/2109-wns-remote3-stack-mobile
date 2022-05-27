import { Pressable, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { AntDesign, Entypo } from '@expo/vector-icons';
import dateFormat from 'dateformat';
import { useNavigation } from '@react-navigation/native';
import { getProjectByIdId_getProjectByID } from '../../API/types/getProjectByIdId';
import Status from '../Status';

interface IProps {
  project: getProjectByIdId_getProjectByID;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8790E0',
  },
});

export default function ProjectInformations({ project }: IProps) {
  const navigation = useNavigation();

  return (
    <View style={tw`mx-4`}>
      <Text style={styles.text}>{project.name}</Text>
      <Text style={tw`text-white mt-1`}>
        Due date : {dateFormat(new Date(project.endDate), 'dddd dd mmmm yyyy')}
      </Text>
      <View style={tw`flex flex-row justify-between items-center mt-3`}>
        <Pressable
          onPress={() =>
            navigation.navigate('UpdateStatus', { id: project.id })
          }
        >
          <Status status={project.status} />
        </Pressable>
        <View style={tw`flex flex-row`}>
          <Pressable
            onPress={() =>
              navigation.navigate('CreateUpdateproject', { id: project.id })
            }
          >
            <AntDesign style={tw`mr-4`} name="edit" size={22} color="white" />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('DeleteProject', { id: project.id })
            }
          >
            <Entypo name="trash" size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
