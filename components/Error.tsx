import { Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { ApolloError } from '@apollo/client';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  error?: ApolloError;
}

export default function Error({ error }: IProps) {
  return (
    <View style={[tw`px-5`, { backgroundColor: '#15192C', height: '100%' }]}>
      <Text style={tw`text-white font-bold`}>
        Ooops somethings goes wrong... 😢
      </Text>
      {error && (
        <Text style={tw`text-white font-bold mt-2`}>{error.message}</Text>
      )}
      <Text style={tw`text-white font-bold mt-2`}>
        Please try later or contact the support
      </Text>
    </View>
  );
}
