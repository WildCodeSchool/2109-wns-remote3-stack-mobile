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
      <Text
        style={[
          tw`ml-1 py-1 px-2 h-7 text-xs text-white`,
          status === 'TODO' && styles.advancementTodo,
          status === 'IN_PROGRESS' && styles.advancementInProgress,
          status === 'DONE' && styles.advancementDone,
        ]}
      >
        {status}
      </Text>
    </View>
  );
}
