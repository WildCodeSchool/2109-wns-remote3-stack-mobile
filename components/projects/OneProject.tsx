import { Text, View } from 'react-native';
import React from 'react';
import dateFormat from 'dateformat';
import tw from 'tailwind-react-native-classnames';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';
import Pastille from '../Pastille';

interface IProps {
  item: GetAllProjects_getAllProjects;
}
export default function OneProject({ item }: IProps) {
  return (
    <>
      <View style={tw`flex flex-row items-center  justify-between`}>
        <Text style={tw`text-white font-bold text-xl`}>{item.name}</Text>
        <Pastille status={item.status} />
      </View>
      <Text style={tw`text-white mt-2`}>
        Due date : {dateFormat(new Date(item.endDate), 'dddd dd mmmm yyyy')}
      </Text>
    </>
  );
}
