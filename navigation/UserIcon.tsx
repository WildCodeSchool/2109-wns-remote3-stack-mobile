import { View, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
});

export default function UserIcon() {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 flex px-5 py-4`}>
      <Pressable onPress={() => navigation.navigate('Userprofil' as never)}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
          }}
        />
      </Pressable>
    </View>
  );
}
