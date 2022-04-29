import React, { Dispatch, SetStateAction } from 'react';
import { Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { getTaskByID_getTaskByID_tags } from '../../API/types/getTaskByID';

interface OneTagProps {
  item: getTaskByID_getTaskByID_tags;
  setTags: Dispatch<SetStateAction<getTaskByID_getTaskByID_tags[]>>;
  tags: getTaskByID_getTaskByID_tags[];
}

function OneTagCreateTask({ item, tags, setTags }: OneTagProps) {
  const handleClick = (tag: getTaskByID_getTaskByID_tags) => {
    let isItem = false;
    for (let i = 0; i < tags.length; i += 1) {
      if (tags[i].id === tag.id) {
        isItem = true;
        setTags(tags.filter((obj) => obj.id !== tag.id));
        return;
      }
    }
    if (!isItem) {
      setTags([...tags, tag]);
    }
  };

  return (
    <Pressable
      onPress={() => {
        handleClick(item);
      }}
      style={[
        tags.includes(item) ? tw`opacity-100` : tw`opacity-30`,
        { backgroundColor: `${item.color}` },
        tw`flex-row mb-4 mx-2 rounded-md justify-between pl-3 pr-2`,
      ]}
    >
      <Text style={[{ color: '#ffff' }, tw`m-auto py-3`]}>{item.label}</Text>
    </Pressable>
  );
}
export default OneTagCreateTask;
