import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  setNav: Dispatch<SetStateAction<string>>;
  nav: string;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 15,
  },
  selected: {
    color: '#8790E0',
    fontWeight: 'bold',
    marginRight: 20,
    fontSize: 16,
  },
  unSelected: {
    color: 'white',
    marginRight: 20,
    fontSize: 16,
  },
});

export default function ProjectNavigation({ setNav, nav }: IProps) {
  return (
    <View style={tw`mx-4 mt-7 flex flex-row pb-1`}>
      <Pressable onPress={() => setNav('tasks')}>
        <Text style={nav === 'tasks' ? styles.selected : styles.unSelected}>
          Tasks
        </Text>
      </Pressable>
      <Pressable onPress={() => setNav('assignedUser')}>
        <Text
          style={nav === 'assignedUser' ? styles.selected : styles.unSelected}
        >
          Assigned Users
        </Text>
      </Pressable>
      <Pressable onPress={() => setNav('newsFeed')}>
        <Text style={nav === 'newsFeed' ? styles.selected : styles.unSelected}>
          News feed
        </Text>
      </Pressable>
    </View>
  );
}
