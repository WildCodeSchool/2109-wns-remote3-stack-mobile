import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
// eslint-disable-next-line camelcase
import { getTaskByID_getTaskByID } from '../../API/types/getTaskByID';
import OneTag from '../tag/OneTag';

interface HeaderTaskDetailsProps {
  // eslint-disable-next-line camelcase
  data: getTaskByID_getTaskByID | undefined;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
  title: {
    color: '#8790E0',
    fontSize: 24,
  },
});
// eslint-disable-next-line camelcase
export default function HeaderTaskDetails({
  data,
}: // eslint-disable-next-line camelcase
HeaderTaskDetailsProps) {
  const navigation = useNavigation();
  const renderItem = ({ item }: any) => <OneTag item={item} />;
  return (
    <View style={tw`flex-row w-full mb-2 px-5 items-center justify-between`}>
      <View>
        <Pressable
          onPress={() => navigation.navigate('Root' as never)}
          style={tw`flex-row items-center mb-3`}
        >
          <Ionicons name="arrow-back-circle-outline" color="white" size={24} />
          <Text style={[{ width: 'auto' }, tw`text-white ml-2`]}>Back</Text>
        </Pressable>
        <Text style={styles.title}> {data ? data.name : `TaskDetails`} </Text>
        <FlatList
          horizontal
          data={data?.tags}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={[{ width: 'auto' }, tw`flex-row `]}
        />
      </View>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        }}
      />
    </View>
  );
}
