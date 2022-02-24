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
        tw`flex-row mb-2 justify-between pl-3 pr-2 rounded-full mt-2 ml-2`,
        { backgroundColor: `${item.color}` },
      ]}
    >
      <Text style={{ color: '#ffff' }}>{item.label}</Text>
    </View>
  );
}
export default OneTag;
