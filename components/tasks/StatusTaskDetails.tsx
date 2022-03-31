import { AntDesign } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface StatusTaskDetailsProps {
  status: string | undefined;
  updateStatus: boolean;
  setUpdateStatus: Dispatch<SetStateAction<boolean>>;
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
  },
});

export default function StatusTaskDetails({
  status,
  setUpdateStatus,
  updateStatus,
}: StatusTaskDetailsProps) {
  return (
    <View style={tw` flex-row items-center `}>
      <View
        style={[
          tw` py-1 rounded-md pl-5 pr-6`,
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
      <Pressable onPress={() => setUpdateStatus(!updateStatus)}>
        <AntDesign style={tw`ml-2 mr-3`} name="edit" size={19} color="white" />
      </Pressable>
    </View>
  );
}
