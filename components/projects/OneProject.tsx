import { Text, View } from 'react-native';
import React from 'react';
import dateFormat from 'dateformat';
import tw from 'tailwind-react-native-classnames';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';
import Status from '../Status';

interface IProps {
  item: GetAllProjects_getAllProjects;
}
export default function OneProject({ item }: IProps) {
  return (
    <>
      <View style={tw`flex flex-row items-center  justify-between`}>
        <Text style={tw`text-white font-bold text-xl`}>{item.name}</Text>
        <Status status={item.status} />
      </View>
      <Text style={tw`text-white mt-5`}>
        Due date : {dateFormat(new Date(item.endDate), 'dddd dd mmmm yyyy')}
      </Text>
      <Text style={tw`text-white mt-1`}>
        StartDate : {dateFormat(new Date(item.startDate), 'dddd dd mmmm yyyy')}
      </Text>
    </>
  );
}
