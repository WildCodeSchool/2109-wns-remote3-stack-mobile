import { AntDesign } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View>
      <TouchableOpacity onPress={() => setUpdateStatus(!updateStatus)}>
        <View
          style={[
            tw`flex flex-row py-1 flex-row items-center rounded-md px-5 py-2`,
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
          <AntDesign name="edit" size={16} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
