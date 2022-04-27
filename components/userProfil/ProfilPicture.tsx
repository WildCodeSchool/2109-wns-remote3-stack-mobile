import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  userFirstName: string;
  userAvatarUrl: string | null;
}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#8790E0',
  },
  defaultAvatar: {
    backgroundColor: '#8790E0',
  },
  letter: {
    fontSize: 50,
  },
});

export default function ProfilPicture({
  userFirstName,
  userAvatarUrl,
}: IProps) {
  const letter = userFirstName.split('')[0];
  return (
    <View>
      {userAvatarUrl ? (
        <Image
          style={styles.image}
          source={{
            uri: userAvatarUrl,
          }}
        />
      ) : (
        <View
          style={[
            tw`h-20 w-20  rounded-full flex items-center justify-center`,
            styles.defaultAvatar,
          ]}
        >
          <Text style={[tw`text-white`, styles.letter]}>{letter}</Text>
        </View>
      )}
    </View>
  );
}
