import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
  text: {
    color: '#ffff',
  },
});

export default function Status({ status }: { status: string }) {
  return (
    <View>
      <View
        style={[
          tw`py-1 rounded-md pl-2 pr-3`,
          status === 'TO_DO' && styles.advancementTodo,
          status === 'IN_PROGRESS' && styles.advancementInProgress,
          status === 'DONE' && styles.advancementDone,
        ]}
      >
        <Text style={[tw`ml-1 py-1 px-2 text-xs text-center`, styles.text]}>
          {status}
        </Text>
      </View>
    </View>
  );
}
