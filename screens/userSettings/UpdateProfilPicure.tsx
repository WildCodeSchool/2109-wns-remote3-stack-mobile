import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderUpdateProfilPicture from '../../components/userSettings/HeaderUpdateProfilPicture';
import { RootTabParamList } from '../../types';

type RootStackParam = {
  id: { id: string };
};
type navProps = StackNavigationProp<RootTabParamList, 'Settings'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'flex-start',
  },
});
export default function UpdateProfilPicture() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const navigation = useNavigation<navProps>();
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Settings', { id })}
        style={tw`flex items-center w-full bg-purple-300 bg-opacity-10 rounded-lg p-2 mb-5`}
      >
        <AntDesign name="caretdown" size={24} color="#8790E0" />
      </Pressable>
      <HeaderUpdateProfilPicture userId={id} />
    </View>
  );
}
