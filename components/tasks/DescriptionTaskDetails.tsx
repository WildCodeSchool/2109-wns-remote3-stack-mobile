import React, { useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface DescriptionTaskDetailsProps {
  description: string | undefined;
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

export default function DescriptionTaskDetails({
  description,
}: DescriptionTaskDetailsProps) {
  const [isDescription, setIsDescription] = useState(true);
  return (
    <>
      <Pressable
        onPress={() => setIsDescription(!isDescription)}
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
        <Text style={[styles.text, tw`px-3 mt-3`]}> {description} </Text>
      )}
      <Text>frjfr</Text>
    </>
  );
}
