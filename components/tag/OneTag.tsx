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
        tw`flex-row mb-2 justify-between p-1 h-7 px-4 rounded-full mt-2 ml-2`,
        { backgroundColor: `${item.color}` },
      ]}
    >
      <Text style={tw`text-white text-sm`}>{item.label}</Text>
    </View>
  );
}
export default OneTag;
