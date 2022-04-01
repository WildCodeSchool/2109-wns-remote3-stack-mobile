import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { getTaskByID_getTaskByID_tags } from '../../API/types/getTaskByID';

interface OneTagProps {
  item: getTaskByID_getTaskByID_tags;
}

function OneTag({ item }: OneTagProps) {
  return (
    <View
      style={[
        tw`rounded-full h-6 px-3 py-1 mr-2`,
        { backgroundColor: `${item.color}` },
      ]}
    >
      <Text style={tw`text-white font-bold text-xs`}>{item.label}</Text>
    </View>
  );
}
export default OneTag;
