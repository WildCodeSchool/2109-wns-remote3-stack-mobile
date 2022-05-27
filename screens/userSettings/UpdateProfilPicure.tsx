import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { UPDATE_USER } from '../../API/mutation/settings';
import { useUserFromStore } from '../../store/slices/user.slice';
import Page404 from '../Page404';

// import Constants from 'expo-constants';

export default function ImagePickerExample() {
  const [image, setImage] = useState<{ localUri: string }>();
  const [newPicture, setNewPicture] = useState('');
  const navigation = useNavigation();
  const { user } = useUserFromStore();
  const CLOUDINARY_URL = Constants?.manifest?.extra?.wsUri;

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

    const data = {
      file: base64Img,
      upload_preset: 'ml_default',
    };

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Pick an image from camera roll"
        onPress={openImagePickerAsync}
      />

      <Image
        source={{ uri: image?.localUri }}
        style={{ width: 200, height: 200 }}
      />

      {newPicture !== '' && (
        <Button title="Confirm" onPress={() => handleUpdateUser()} />
      )}
    </View>
  );
}
