import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useQuery } from '@apollo/client';
import { getTags_getAllTags } from '../../API/types/getTags';
import OneTagCreateTask from './OnTagCreateTask';
import { GET_ALL_TAGS } from '../../API/queries/tagsQueries';
import { getTaskByID_getTaskByID_tags } from '../../API/types/getTaskByID';

interface SelectTagsProps {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  isModal: boolean;
  setTags: Dispatch<SetStateAction<getTaskByID_getTaskByID_tags[]>>;
  tags: getTaskByID_getTaskByID_tags[];
}
interface IResponseTags {
  getAllTags: getTags_getAllTags[];
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#282D43',
    height: '80%',
    width: '100%',
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
    backgroundColor: '#7950EC',
  },
  modalView: {
    backgroundColor: '#282D43',
    marginTop: 10,
    borderRadius: 20,
    width: 380,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button2: {
    backgroundColor: '#8790E0',
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

  const renderItem = ({ item }: { item: getTaskByID_getTaskByID_tags }) => (
    <OneTagCreateTask tags={tags} setTags={setTags} item={item} />
  );
  return (
    <GestureRecognizer
      style={{ width: 200 }}
      onSwipeUp={() => setIsModal(true)}
      onSwipeDown={() => setIsModal(false)}
    >
      <Modal
        transparent
        visible={isModal}
        animationType="slide"
        style={tw`w-full `}
      >
        <View style={styles.centeredView}>
          <Text
            style={tw`text-white font-bold mt-5 mb-1 text-xl font-bold text-center`}
          >
            Select Tag(s)
          </Text>
          <View style={tw`w-11/12 mt-2`}>
            <FlatList
              data={dataTagsList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsModal(false)}
            style={[tw`my-5 w-11/12 py-3 rounded-md`, styles.button2]}
          >
            <Text style={tw`text-white text-center font-bold text-lg`}>Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </GestureRecognizer>
  );
}
export default SelectTags;
