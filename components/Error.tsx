import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  errorMessage?: string;
}

export default function Error({ errorMessage }: IProps) {
  const navigation = useNavigation();
  return (
    <View
      style={[tw`px-5 py-10`, { backgroundColor: '#15192C', height: '100%' }]}
    >
      <Text style={tw`text-white text-lg font-bold`}>{errorMessage}</Text>

      <Text style={tw`text-white font-bold mt-2`}>
        Please try later or contact the support
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Homepage')}
        style={[tw`px-7 mt-5 py-3 rounded-md`, { backgroundColor: '#8790E0' }]}
      >
        <Text style={tw`text-white text-center font-bold`}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

Error.defaultProps = {
  errorMessage: 'Ooops somethings goes wrong... 😢',
};
