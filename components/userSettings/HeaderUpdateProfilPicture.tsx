import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  textHeader: {
    color: '#8790E0',
  },
});

interface IProps {
  userId: string;
}

export default function HeaderUpdateProfilPicture({ userId }: IProps) {
  const navigation = useNavigation();

  return (
    <View style={tw`flex flex-row w-full justify-between items-center px-4`}>
      <TouchableOpacity onPress={() => navigation.navigate('Root')}>
        <AntDesign name="left" size={20} color="#8790E0" style={tw``} />
      </TouchableOpacity>
      <Text style={[tw`text-xl font-bold`, styles.textHeader]}>
        Choose Profil Picture
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Camera', { id: userId })}
      >
        <AntDesign style={[tw`ml-2`]} name="camera" size={20} color="#8790E0" />
      </TouchableOpacity>
    </View>
  );
}
