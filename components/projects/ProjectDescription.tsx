import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  description: string;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#8790E0',
    paddingBottom: 6,
  },
});

export default function ProjectDescription({ description }: IProps) {
  const [isTextVisible, setIsTextVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={tw`font-bold text-white text-lg`}>Description</Text>
        <Pressable onPress={() => setIsTextVisible((prev) => !prev)}>
          {!isTextVisible ? (
            <AntDesign name="downcircleo" size={24} color="white" />
          ) : (
            <AntDesign name="upcircleo" size={24} color="white" />
          )}
        </Pressable>
      </View>
      <Text style={tw`text-white leading-6 border border-white mt-2`}>
        {isTextVisible && description}
      </Text>
    </View>
  );
}
