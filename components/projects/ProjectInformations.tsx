/* eslint-disable camelcase */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import dateFormat from 'dateformat';
import { getProjectByIdId_getProjectByID } from '../../API/types/getProjectByIdId';
import Status from '../Status';

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

export default function ProjectInformations({ project }: IProps) {
  return (
    <View style={styles.container}>
      <Status status={project.status} />
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
