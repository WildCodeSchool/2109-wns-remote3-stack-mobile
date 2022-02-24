import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

interface MenuProps {
  firstLabel: string;
  secondLabel: string;
  addLabel: string;
  setIsActive: Dispatch<SetStateAction<string>>;
  isActive: string;
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
  addLabel,
  isActive,
  setIsActive,
}: MenuProps) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View
      style={[
        styles.container,
        tw`flex-row w-11/12 justify-between pb-2 mt-16`,
      ]}
    >
      <View style={tw`flex-row`}>
        <Text
          onPress={() => setIsActive('list')}
          style={[
            styles.text,
            tw`mr-4`,
            isActive === 'list' ? styles.textBold : styles.textRegular,
          ]}
        >
          {firstLabel}
        </Text>
        <Text
          onPress={() => setIsActive('feed')}
          style={[
            styles.text,
            tw`mr-4`,
            isActive === 'feed' ? styles.textBold : styles.textRegular,
          ]}
        >
          {secondLabel}
        </Text>
      </View>
      <Pressable
        onPress={
          route.name === 'TaskList'
            ? () => navigation.navigate('Createtask' as never)
            : () =>
                navigation.navigate('CreateUpdateproject', {
                  id: undefined,
                } as never)
        }
      >
        <Text style={[styles.text, styles.textBold]}> Add {addLabel}</Text>
      </Pressable>
    </View>
  );
}
