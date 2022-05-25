import React, { useEffect, useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@apollo/client';
import Constants from 'expo-constants';
import UPLOAD_FILE from '../../API/mutation/File';
import { UploadFile, UploadFileVariables } from '../../API/types/UploadFile';
import generateRNFile from '../../utils/expo/generateRnFiles';

export default function ImagePickerExample() {
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } =
          await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [uploadFile] = useMutation<UploadFile, UploadFileVariables>(
    UPLOAD_FILE,
    {
      onCompleted: (d) => {
        console.log(d);
      },
    }
  );

  async function onUploadPress() {
    const file = generateRNFile(image, `picture-${Date.now()}`);
    console.log(file);
    uploadFile({
      variables: { file },
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image !== '' && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Confirm" onPress={() => onUploadPress()} />
    </View>
  );
}
