import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  nav: string;
  setNav: Dispatch<SetStateAction<string>>;
  backgroundColor: 'light' | 'dark';
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: '#15192C',
    borderColor: '#15192C',
  },
  light: {
    backgroundColor: '#15192C',
    borderColor: '#8790E0',
  },
  doneSelected: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#2C9E7C',
  },
  inProgressSelected: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#E4AC65',
  },
  todoSelected: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#2B8AD1',
  },
  unSelected: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default function StatusNavigation({
  nav,
  setNav,
  backgroundColor,
}: IProps) {
  return (
    <View
      style={[
        tw`mt-2 flex flex-row rounded-lg bg-blue-300 border`,
        backgroundColor === 'light' ? styles.light : styles.dark,
      ]}
    >
      <Pressable
        style={[
          tw`p-2 py-3 rounded-lg w-1/3`,
          nav === 'TO_DO' ? styles.todoSelected : styles.unSelected,
        ]}
        onPress={() => setNav('TO_DO')}
      >
        <Text style={nav === 'TO_DO' ? styles.todoSelected : styles.unSelected}>
          To do
        </Text>
      </Pressable>
      <Pressable
        style={[
          tw`p-2 py-3 rounded-lg w-1/3`,
          nav === 'IN_PROGRESS' ? styles.inProgressSelected : styles.unSelected,
        ]}
        onPress={() => setNav('IN_PROGRESS')}
      >
        <Text
          style={
            nav === 'IN_PROGRESS'
              ? styles.inProgressSelected
              : styles.unSelected
          }
        >
          In Progress
        </Text>
      </Pressable>
      <Pressable
        style={[
          tw`p-2 py-3 rounded-lg w-1/3`,
          nav === 'DONE' ? styles.doneSelected : styles.unSelected,
        ]}
        onPress={() => setNav('DONE')}
      >
        <Text style={nav === 'Done' ? styles.doneSelected : styles.unSelected}>
          Done
        </Text>
      </Pressable>
    </View>
  );
}
