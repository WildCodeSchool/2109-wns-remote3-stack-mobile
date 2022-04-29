import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  userFirstName: string;
  userAvatarUrl: string | null;
  userId: string;
}

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#8790E0',
  },
  defaultAvatar: {
    backgroundColor: '#8790E0',
  },
  letter: {
    fontSize: 70,
  },
  camera: {
    flex: 1,
  },
  modal: {
    flex: 1,
  },
});

export default function ProfilPicture({
  userFirstName,
  userAvatarUrl,
  userId,
}: IProps) {
  const navigation = useNavigation();
  const letter = userFirstName.split('')[0];

  return (
    <View>
      {userAvatarUrl ? (
        <View>
          <Image
            style={styles.image}
            source={{
              uri: userAvatarUrl,
            }}
          />
          <Pressable>
            <Image
              style={tw`absolute right-5 bottom-0`}
              source={require('../../assets/images/EditProfilPicture.png')}
            />
          </Pressable>
        </View>
      ) : (
        <View style={tw`relative`}>
          <View
            style={[
              tw`h-32 w-32  rounded-full flex items-center justify-center`,
              styles.defaultAvatar,
            ]}
          >
            <Text style={[tw`text-white`, styles.letter]}>{letter}</Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('UpdateProfilPicture', { id: userId })
            }
          >
            <Image
              style={tw`absolute right-5 bottom-0`}
              source={require('../../assets/images/EditProfilPicture.png')}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
