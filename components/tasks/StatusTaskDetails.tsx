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
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default function StatusTaskDetails({ status }: StatusTaskDetailsProps) {
  return (
    <View
      style={[
        tw` py-1 rounded-sm pl-2 pr-3`,
        status === 'TO_DO' && styles.advancementTodo,
        status === 'IN_PROGRESS' && styles.advancementInProgress,
        status === 'DONE' && styles.advancementDone,
      ]}
    >
      {status === 'TO_DO' && <Text style={styles.text}> Todo </Text>}
      {status === 'IN_PROGRESS' && (
        <Text style={styles.text}> In Progress </Text>
      )}
      {status === 'DONE' && <Text style={styles.text}> Done </Text>}
    </View>
  );
}
