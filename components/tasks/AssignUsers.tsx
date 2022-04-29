import { StyleSheet, View, Image, FlatList } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { getTaskByID_getTaskByID_users } from '../../API/types/getTaskByID';
import DefaultAvatar from '../DefaultAvatar';

interface IProps {
  data: getTaskByID_getTaskByID_users[];
}
const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(135, 144, 224, 0.84)',
  },
});

export default function AssignUsers({ data }: IProps) {
  return (
    <View style={tw`flex flex-row items-end justify-end`}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              {
                transform: [
                  data.length === 1
                    ? { translateX: -index * 20 }
                    : { translateX: 15 - index * 20 },
                ],
              },
            ]}
          >
            {item.avatar ? (
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.avatar as string,
                  }}
                />
              </View>
            ) : (
              <DefaultAvatar
                userId={item.id}
                userFirstName={item.firstName as string}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
