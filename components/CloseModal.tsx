import { Pressable } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface IProps {
  path: keyof RootStackParamList;
  id: string;
}

export default function CloseModal({ path, id }: IProps) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(path, { id })}
      style={tw`flex items-center w-full bg-purple-300 bg-opacity-10 rounded-lg p-2 mb-5`}
    >
      <AntDesign name="caretdown" size={24} color="#8790E0" />
    </Pressable>
  );
}
