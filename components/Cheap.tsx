import { StyleSheet, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

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

export default function Cheap({ status }: { status: string }) {
  return (
    <View
      style={[
        tw`py-1 rounded-full h-5 w-5`,
        status === 'TO_DO' && styles.advancementTodo,
        status === 'IN_PROGRESS' && styles.advancementInProgress,
        status === 'DONE' && styles.advancementDone,
      ]}
    />
  );
}
