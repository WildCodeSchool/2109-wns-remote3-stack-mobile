import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  setNav: Dispatch<SetStateAction<string>>;
  nav: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15192C',
  },
  selected: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#8790E0',
  },
  unSelected: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default function ProjectNavigation({ setNav, nav }: IProps) {
  return (
    <View
      style={[
        tw`mx-4 mt-4 mb-2 flex flex-row rounded-lg bg-blue-300`,
        styles.container,
      ]}
    >
      <Pressable
        style={[
          tw`p-3 rounded-lg w-1/3`,
          nav === 'tasks' ? styles.selected : styles.unSelected,
        ]}
        onPress={() => setNav('tasks')}
      >
        <Text style={nav === 'tasks' ? styles.selected : styles.unSelected}>
          Tasks
        </Text>
      </Pressable>
      <Pressable
        style={[
          tw`p-3 rounded-lg w-1/3`,
          nav === 'assignedUser' ? styles.selected : styles.unSelected,
        ]}
        onPress={() => setNav('assignedUser')}
      >
        <Text
          style={nav === 'assignedUser' ? styles.selected : styles.unSelected}
        >
          Users
        </Text>
      </Pressable>
      <Pressable
        style={[
          tw`p-3 rounded-lg w-1/3`,
          nav === 'newsFeed' ? styles.selected : styles.unSelected,
        ]}
        onPress={() => setNav('newsFeed')}
      >
        <Text style={nav === 'newsFeed' ? styles.selected : styles.unSelected}>
          News feed
        </Text>
      </Pressable>
    </View>
  );
}
