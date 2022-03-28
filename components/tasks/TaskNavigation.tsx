import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  setNav: Dispatch<SetStateAction<string>>;
  nav: string;
}

const styles = StyleSheet.create({
  container: {
    width: 370,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#8790E0',
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

export default function TaskNavigation({ setNav, nav }: IProps) {
  return (
    <View style={[styles.container, tw`mx-4 mt-7 flex flex-row pb-1 mb-3`]}>
      <Pressable onPress={() => setNav('comments')}>
        <Text style={nav === 'comments' ? styles.selected : styles.unSelected}>
          Comments
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
