import React, { useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
// eslint-disable-next-line camelcase
import { getProjectByIdId_getProjectByID_tasks } from '../../API/types/getProjectByIdId';

interface DescriptionTaskDetailsProps {
  // eslint-disable-next-line camelcase
  getTaskByID: getProjectByIdId_getProjectByID_tasks;
}
const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
  text: {
    color: '#ffff',
  },
  textGray: {
    color: '#A29EAC',
  },
});
// eslint-disable-next-line camelcase
export default function DescriptionTaskDetails({
  getTaskByID,
}: // eslint-disable-next-line camelcase
DescriptionTaskDetailsProps) {
  const [isDescription, setIsDescription] = useState(false);
  return (
    <>
      <Pressable
        onPress={
          isDescription === true
            ? () => setIsDescription(false)
            : () => setIsDescription(true)
        }
        style={[
          styles.borderBottom,
          tw`flex-row justify-between w-full mt-5 w-11/12 pb-1`,
        ]}
      >
        <Text style={styles.textGray}>Description</Text>
        <Ionicons
          style={
            isDescription
              ? { transform: [{ rotate: '180deg' }] }
              : { transform: [{ rotate: '0deg' }] }
          }
          name="chevron-down-outline"
          size={20}
          color="white"
        />
      </Pressable>
      {isDescription && (
        <Text style={[styles.text, tw`px-3 mt-3`]}>
          {getTaskByID.description}
        </Text>
      )}
    </>
  );
}
