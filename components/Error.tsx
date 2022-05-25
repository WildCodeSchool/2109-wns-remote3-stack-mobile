import { Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  errorMessage?: string;
}

export default function Error({ errorMessage }: IProps) {
  return (
    <View style={[tw`px-5`, { backgroundColor: '#15192C', height: '100%' }]}>
      <Text style={tw`text-white font-bold`}>{errorMessage}</Text>

      <Text style={tw`text-white font-bold mt-2`}>
        Please try later or contact the support
      </Text>
    </View>
  );
}

Error.defaultProps = {
  errorMessage: 'Ooops somethings goes wrong... 😢',
};
