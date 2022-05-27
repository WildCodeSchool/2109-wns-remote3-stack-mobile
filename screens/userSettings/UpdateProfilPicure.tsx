import React, { useState } from 'react';
import { Image, View, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { Text } from 'react-native-elements';
import { UPDATE_USER } from '../../API/mutation/settings';
import { useUserFromStore } from '../../store/slices/user.slice';
import Page404 from '../Page404';
import HeaderUpdateProfilPicture from '../../components/userSettings/HeaderUpdateProfilPicture';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8790E0',
  },
});
export default function ImagePickerExample() {
  const [image, setImage] = useState<{ localUri: string }>();
  const [newPicture, setNewPicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { user } = useUserFromStore();
  const CLOUDINARY_URL = Constants?.manifest?.extra?.cloudinaryUrl;

  const [updateUser, { error: errorUser }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      navigation.navigate('Userprofil', { id: user.id });
    },
  });
  if (errorUser) return <Page404 />;

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setImage({ localUri: pickerResult.uri });

    const base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    // TODO .ENCV ML_DEFAULT
    const data = {
      file: base64Img,
      upload_preset: 'ml_default',
    };
    setIsLoading(true);
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async (r) => {
        const res = await r.json();
        setNewPicture(res.url);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateUser = () => {
    const NewAvatarUser = {
      updateUserId: user.id,
      avatar: newPicture,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    updateUser({ variables: NewAvatarUser });
  };

  return (
    <>
      <HeaderUpdateProfilPicture />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#15192C',
          alignItems: 'center',
        }}
      >
        {user.avatar && newPicture === '' && (
          <View style={tw`relative`}>
            <Image
              source={{ uri: user.avatar }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />

            <Pressable
              style={tw`absolute right-5 bottom-0`}
              onPress={openImagePickerAsync}
            >
              <Image
                source={require('../../assets/images/EditProfilPicture.png')}
              />
            </Pressable>
          </View>
        )}

        {newPicture !== '' && (
          <View>
            {!isLoading ? (
              <View style={tw`w-full`}>
                <View style={tw`relative`}>
                  <Image
                    source={{ uri: image?.localUri }}
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  />

                  <Pressable
                    style={tw`absolute right-5 bottom-0`}
                    onPress={openImagePickerAsync}
                  >
                    <Image
                      source={require('../../assets/images/EditProfilPicture.png')}
                    />
                  </Pressable>
                </View>
                <Pressable
                  style={[styles.button, tw`mt-6 rounded-lg py-5`]}
                  onPress={() => handleUpdateUser()}
                >
                  <Text style={tw`text-center font-bold text-lg text-white `}>
                    Confirm
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Text>toto</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
}
