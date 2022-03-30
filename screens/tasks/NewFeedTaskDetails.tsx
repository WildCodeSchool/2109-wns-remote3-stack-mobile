// import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

// interface CommentsTaskDetailsProps {
//   data: getTaskByID_getTaskByID | undefined;
// }
// type paramsProps = {
//   id: { id: string };
// };

export default function NewFeedTaskDetails() {
  // {
  //   data,
  // }: CommentsTaskDetailsProps
  //   const route = useRoute<RouteProp<paramsProps>>();

  return (
    <View style={tw`h-full`}>
      <Text>New Feed</Text>
    </View>
  );
}
