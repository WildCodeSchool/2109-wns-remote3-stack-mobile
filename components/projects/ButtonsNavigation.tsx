import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

interface ButtonsNavigationProps {
  projectId: string;
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

export default function ButtonsNavigation({
  projectId,
}: ButtonsNavigationProps) {
  const navigation = useNavigation();

  const dataButtons = ['New Feed', 'Tasks', 'Assign User'];
  return (
    <View style={tw`mt-5 mx-4`}>
      {dataButtons.map((labelButton) => {
        return (
          <Pressable
            key={labelButton}
            onPress={() => {
              if (labelButton === 'Tasks') {
                navigation.navigate('ProjectTasks', {
                  id: projectId,
                });
              } else if (labelButton === 'Assign User') {
                navigation.navigate('AssignedUserProject', {
                  id: projectId,
                });
              } else {
                navigation.navigate('NewsFeedProject', {
                  id: projectId,
                });
              }
            }}
            style={[
              styles.buttons,
              tw`flex-row items-center rounded-lg p-2 mb-4 justify-between`,
            ]}
          >
            <Text style={styles.buttonsText}>{labelButton}</Text>
            <Ionicons
              name="chevron-up-circle-outline"
              color="#8790E0"
              size={25}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
