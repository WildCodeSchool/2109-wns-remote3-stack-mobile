import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Text,
  Pressable,
  FlatList,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useQuery } from '@apollo/client';
import { getTags_getAllTags } from '../../API/types/getTags';
import OneTagCreateTask from './OnTagCreateTask';
import { GET_ALL_TAGS } from '../../API/queries/tagsQueries';
import { ITagPayload } from '../../API/types/globalTypes';
import OneTag from '../tag/OneTag';

interface SelectTagsProps {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  isModal: boolean;
  setTags: Dispatch<SetStateAction<ITagPayload[]>>;
  tags: ITagPayload[];
}
interface IResponseTags {
  getAllTags: getTags_getAllTags[];
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 30,
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#282D43',
    height: '80%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonModal: {
    backgroundColor: '#8790E0',
    width: '95%',
    textAlign: 'center',
    borderRadius: 6,
    bottom: 50,
    position: 'absolute',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#8790E0',
    width: 350,
    borderRadius: 6,
  },
  modalView: {
    backgroundColor: '#282D43',
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    width: 390,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
function SelectTags({ setIsModal, isModal, setTags, tags }: SelectTagsProps) {
  const [dataTagsList, setDataTagsList] = useState<getTags_getAllTags[]>([]);

  // FETCH TAGS
  useQuery<IResponseTags>(GET_ALL_TAGS, {
    onCompleted: (d) => {
      setDataTagsList(d.getAllTags);
    },
  });
  const tagsActive = ({ item }: any) => <OneTag item={item} />;
  const renderItem = ({ item }: any) => (
    <OneTagCreateTask tags={tags} setTags={setTags} item={item} />
  );
  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeUp={() => setIsModal(true)}
      onSwipeDown={() => setIsModal(false)}
    >
      <Pressable
        style={[styles.button, tw`py-2 mt-3`]}
        onPress={() => setIsModal(!isModal)}
      >
        <Text style={tw`text-white text-lg text-center`}>
          {tags.length === 0 ? `Select Tag(s)` : `Edit Tag(s)`}
        </Text>
      </Pressable>
      <Modal
        transparent
        visible={isModal}
        animationType="slide"
        style={{ marginTop: 20 }}
      >
        <View style={styles.centeredView}>
          <Text style={tw`text-white font-bold mb-3 text-center`}>
            Select Tag(s)
          </Text>
          <View style={styles.modalView}>
            <FlatList
              data={dataTagsList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          {tags.length > 0 && (
            <Text style={tw`text-white font-bold mb-3 text-center`}>Tags:</Text>
          )}
          <View style={tw`flex-col w-full`}>
            <FlatList
              numColumns={3}
              style={tw`flex-wrap flex-col w-full pl-16`}
              data={tags}
              renderItem={tagsActive}
              keyExtractor={(item) => item.label}
            />
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
}
export default SelectTags;