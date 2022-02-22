import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface EndDateTaskDetailsProps {
  // eslint-disable-next-line camelcase
  date: string | undefined;
}

export default function EndDateTaskDetails({
  date,
}: // eslint-disable-next-line camelcase
EndDateTaskDetailsProps) {
  return (
    <View style={tw`flex-row w-full justify-between items-center px-3 mt-5`}>
      <Text style={{ color: '#A29EAC' }}>{date}</Text>
      <Ionicons name="calendar-outline" color="#A29EAC" size={20} />
    </View>
  );
}
