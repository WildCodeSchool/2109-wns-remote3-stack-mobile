import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface StatusTaskDetailsProps {
  status: string | undefined;
}

const styles = StyleSheet.create({
  advancementDone: {
    backgroundColor: '#2C9E7C',
  },
  advancementTodo: {
    backgroundColor: '#2B8AD1',
  },
  advancementInProgress: {
    backgroundColor: '#E4AC65',
  },
});

export default function StatusTaskDetails({ status }: StatusTaskDetailsProps) {
  return (
    <View style={tw`flex-row w-full justify-between items-center px-3 mt-5`}>
      <Text style={{ color: '#A29EAC' }}>Status</Text>
      <View
        style={[
          tw`ml-1 py-1 rounded-sm pl-2 pr-3`,
          status === 'TO_DO' && styles.advancementTodo,
          status === 'IN_PROGRESS' && styles.advancementInProgress,
          status === 'DONE' && styles.advancementDone,
        ]}
      >
        <Text style={tw`text-xs text-white text-center`}> {status} </Text>
      </View>
    </View>
  );
}
