/* eslint-disable global-require */
import React, { useState, Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

interface MenuProps {
  firstLabel: string;
  secondLabel: string;
  addLabel: string;
  thirdLabel?: string;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const styles = StyleSheet.create({
  text: {
    color: '#8790E0',
    fontSize: 15,
  },
  container: {
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
  },
  textRegular: {
    fontWeight: 'normal',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default function Menu({
  firstLabel,
  secondLabel,
  thirdLabel,
  addLabel,
  setIsActive,
}: MenuProps) {
  const [taskList, setTaskList] = useState(true);

  const navigation = useNavigation();

  const tasklistClicked = () => {
    setIsActive(true);
    setTaskList(true);
  };
  const newfeedClicked = () => {
    setIsActive(false);
    setTaskList(false);
  };
  return (
    <View
      style={[
        styles.container,
        tw`flex-row w-11/12 justify-between pb-2 mt-16`,
      ]}
    >
      <View style={tw`flex-row`}>
        <Text
          onPress={tasklistClicked}
          style={[
            styles.text,
            tw`mr-4`,
            taskList ? styles.textBold : styles.textRegular,
          ]}
        >
          {firstLabel}
        </Text>
        <Text
          onPress={newfeedClicked}
          style={[styles.text, taskList ? styles.textRegular : styles.textBold]}
        >
          {secondLabel}
        </Text>
        {thirdLabel && <Text>{thirdLabel}</Text>}
      </View>
      <Pressable onPress={() => navigation.navigate('Createtask' as never)}>
        <Text style={[styles.text, styles.textBold]}> Add {addLabel}</Text>
      </Pressable>
    </View>
  );
}

Menu.defaultProps = {
  thirdLabel: null,
};
