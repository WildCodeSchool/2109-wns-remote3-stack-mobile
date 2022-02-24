import React, { Dispatch, SetStateAction } from 'react';
import { Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import { getTaskByID_getTaskByID_tags } from '../../API/types/getTaskByID';
import { ITagPayload } from '../../API/types/globalTypes';

interface OneTagProps {
  item: getTaskByID_getTaskByID_tags;
  setTags: Dispatch<SetStateAction<ITagPayload[]>>;
  tags: ITagPayload[];
}

function OneTagCreateTask({ item, tags, setTags }: OneTagProps) {
  const handleClick = (tag: ITagPayload) => {
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
      //   onPress={() => setActive(!isActive)}
      onPress={() => {
        handleClick(item);
      }}
      style={[
        tags.includes(item)
          ? { borderColor: `white`, borderWidth: 2, borderRadius: 6 }
          : { borderColor: `${item.color}`, borderRadius: 6 },
        { backgroundColor: `${item.color}` },
        tw`flex-row mb-4 mx-2 justify-between pl-3 pr-2`,
      ]}
    >
      <Text style={[{ color: '#ffff' }, tw`m-auto py-3`]}>{item.label}</Text>
    </Pressable>
  );
}
export default OneTagCreateTask;
