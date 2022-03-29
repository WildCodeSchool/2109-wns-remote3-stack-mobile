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
    margin: 'auto',
  },
  selected: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#8790E0',
    color: 'white',
    paddingRight: 23,
    paddingLeft: 23,
    padding: 10,
    borderRadius: 5,
  },
  selectedText: {
    color: '#15192C',
  },
  unSelectedText: {
    color: 'white',
  },
  unSelected: {
    paddingRight: 23,
    paddingLeft: 23,
    backgroundColor: '#15192C',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
  },
});

export default function TaskNavigation({ setNav, nav }: IProps) {
  return (
    <View
      style={[
        tw`mx-2 mt-2 mb-2 flex flex-row rounded-lg bg-blue-300`,
        styles.container,
      ]}
    >
      <Pressable onPress={() => setNav('comments')}>
        <View style={nav === 'comments' ? styles.selected : styles.unSelected}>
          <Text
            style={
              nav === 'comments' ? styles.selectedText : styles.unSelectedText
            }
          >
            Comments
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => setNav('assignedUser')}>
        <View
          style={nav === 'assignedUser' ? styles.selected : styles.unSelected}
        >
          <Text
            style={
              nav === 'assignedUser'
                ? styles.selectedText
                : styles.unSelectedText
            }
          >
            Assigned Users
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => setNav('newsFeed')}>
        <View style={nav === 'newsFeed' ? styles.selected : styles.unSelected}>
          <Text
            style={
              nav === 'newsFeed' ? styles.selectedText : styles.unSelectedText
            }
          >
            News feed
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
