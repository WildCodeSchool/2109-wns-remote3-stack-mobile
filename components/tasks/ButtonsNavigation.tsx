import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';

interface ButtonsNavigationProps {
  task: getTaskByID_getTaskByID | undefined;
}
const styles = StyleSheet.create({
  buttonsText: {
    color: '#8790E0',
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttons: {
    borderColor: '#8790E0',
    borderWidth: 1,
  },
});

export default function ButtonsNavigation({ task }: ButtonsNavigationProps) {
  const navigation = useNavigation();

  const dataButtons = ['New Feed', 'Comments', 'Assign User'];
  return (
    <View style={tw`w-11/12 mt-5`}>
      {dataButtons.map((labelButton) => {
        return (
          <Pressable
            key={labelButton}
            onPress={() => {
              if (labelButton === 'Comments') {
                navigation.navigate('CommentsTaskDetails', {
                  id: task?.id,
                });
              } else if (labelButton === 'Assign User') {
                navigation.navigate('AssignUsersTaskDetails', {
                  id: task?.id,
                });
              } else {
                navigation.navigate('NewFeedTaskDetails', {
                  id: task?.id,
                });
              }
            }}
            style={[
              styles.buttons,
              tw`flex-row items-center rounded-lg pl-2 pr-1 pt-2 pb-2 mb-4 justify-between`,
            ]}
          >
            <Text style={styles.buttonsText}>{labelButton}</Text>
            <Ionicons
              name="chevron-forward-circle-outline"
              color="#8790E0"
              size={25}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
