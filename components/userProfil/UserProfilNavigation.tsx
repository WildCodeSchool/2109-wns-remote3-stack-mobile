import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#8790E0',
  },
  selected: {
    backgroundColor: '#8790E0',
  },
});

interface IProps {
  nav: string;
  setNav: Dispatch<SetStateAction<string>>;
}

export default function UserProfilNavigation({ nav, setNav }: IProps) {
  return (
    <View style={[tw`mt-5 rounded-lg flex flex-row w-11/12`, styles.container]}>
      <Pressable
        onPress={() => setNav('projects')}
        style={[
          tw`p-2 py-3 flex items-center rounded-md w-1/2`,
          nav === 'projects' && styles.selected,
        ]}
      >
        <Text style={tw`text-white font-bold`}>Projects</Text>
      </Pressable>
      <Pressable
        onPress={() => setNav('tasks')}
        style={[
          tw`p-2 py-3 flex items-center rounded-md w-1/2 `,
          nav === 'tasks' && styles.selected,
        ]}
      >
        <Text style={tw`text-white font-bold`}>Tasks</Text>
      </Pressable>
    </View>
  );
}
