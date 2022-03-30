import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import { GetTagByID_getTagByID } from '../../API/types/GetTagByID';
import OneTag from '../tag/OneTag';

interface TagsTaskDetailsProps {
  data: getTaskByID_getTaskByID | undefined;
}

const styles = StyleSheet.create({
  list: {
    height: 30,
    flexGrow: 0,
  },
});

function TagsTaskDetails({ data }: TagsTaskDetailsProps): JSX.Element {
  const renderItem = ({ item }: { item: GetTagByID_getTagByID }) => (
    <OneTag item={item} />
  );
  return (
    <View style={tw`w-11/12`}>
      <FlatList
        horizontal
        data={data?.tags}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={[styles.list]}
      />
    </View>
  );
}

export default TagsTaskDetails;
