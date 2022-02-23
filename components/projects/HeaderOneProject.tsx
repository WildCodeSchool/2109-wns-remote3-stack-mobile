import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import dateFormat from 'dateformat';
import { useNavigation } from '@react-navigation/native';
import UserIcon from '../../navigation/UserIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8790E0',
  },
  date: {
    color: '#8790E0',
    fontSize: 13,
    paddingTop: 5,
  },
});

interface IProps {
  projectName: string;
}

export default function HeaderOneProject({ projectName }: IProps) {
  const now = dateFormat(new Date(), 'dddd dd mmmm yyyy');
  const navigation = useNavigation();
  return (
    <View style={tw`flex flex-row  items-center justify-between px-3`}>
      <View style={tw`w-9/12 flex flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Root')}
          style={tw`h-16 flex flex-row items-center mr-1`}
        >
          <AntDesign name="left" size={24} color="#8790E0" style={tw`mr-1`} />
        </TouchableOpacity>
        <View style={tw`flex`}>
          <Text style={styles.text}>{projectName}</Text>
          <Text style={styles.date}>{now}</Text>
        </View>
      </View>
      <UserIcon />
    </View>
  );
}
