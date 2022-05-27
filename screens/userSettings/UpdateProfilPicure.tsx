import React, { useState } from 'react';
import {
  Image,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { UPDATE_USER } from '../../API/mutation/settings';
import { useUserFromStore } from '../../store/slices/user.slice';
import Page404 from '../Page404';
import HeaderUpdateProfilPicture from '../../components/userSettings/HeaderUpdateProfilPicture';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#8790E0',
  },
  defaultAvatar: {
    backgroundColor: '#8790E0',
  },
  letter: {
    fontSize: 100,
  },

  textHeader: {
    color: '#8790E0',
  },
  button: {
    backgroundColor: '#8790E0',
    borderWidth: 1,
    borderColor: '#8790E0',
  },
});
export default function ImagePickerExample() {
  const [image, setImage] = useState<{ localUri: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [base64Img, SetBase64Img] = useState('');

  const navigation = useNavigation();
  const { user } = useUserFromStore();
  const CLOUDINARY_URL = Constants?.manifest?.extra?.cloudinaryUrl;

  const [updateUser, { error: errorUser }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setIsLoading(false);
      navigation.navigate('Root');
    },
  });
  if (errorUser) return <Page404 />;

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
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
    SetBase64Img(`data:image/jpg;base64,${pickerResult.base64}`);
  };

  const handleUpdateUser = () => {
    setIsLoading(true);
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
        const NewAvatarUser = {
          updateUserId: user.id,
          avatar: res.url,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        updateUser({ variables: NewAvatarUser });
      })
      .catch((err) => console.log(err));
  };

  const letter = user.firstName?.split('')[0];

  return (
    <>
      <HeaderUpdateProfilPicture />
      {!isLoading ? (
        <View
          style={{
            height: '100%',
            paddingTop: 50,
            backgroundColor: '#15192C',
            alignItems: 'center',
          }}
        >
          {image?.localUri ? (
            <View style={tw`w-full flex flex-col items-center`}>
              <View style={tw`border-2 rounded-full border-white`}>
                <Image
                  source={{ uri: image?.localUri }}
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                />
              </View>
              <Pressable
                style={[
                  tw`flex flex-row items-center mt-5 justify-center rounded-md w-10/12 py-4`,
                  styles.button,
                ]}
                onPress={() => handleUpdateUser()}
              >
                <Text style={tw`text-center font-bold text-lg text-white `}>
                  Confirm
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={tw`flex flex-col items-center`}>
              <View>
                {user.avatar ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: user.avatar,
                    }}
                  />
                ) : (
                  <View
                    style={[
                      tw`rounded-full flex items-center justify-center`,
                      styles.defaultAvatar,
                      { height: 200, width: 200 },
                    ]}
                  >
                    <Text style={[tw`text-white`, styles.letter]}>
                      {letter}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={[
                  tw`flex flex-row items-center justify-center mt-5 rounded-md px-10 py-4`,
                  styles.button,
                ]}
                onPress={openImagePickerAsync}
              >
                <Text style={tw`text-white font-bold`}>
                  Open your Media librairy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex flex-row items-center rounded-md px-20 py-2 mt-5`,
                  styles.button,
                ]}
                onPress={() => console.log('Camera')}
              >
                <Text style={tw`text-white font-bold`}>Use your camera</Text>
                <AntDesign
                  style={[tw`ml-2`]}
                  name="camera"
                  size={30}
                  color="#FFFF"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <Loader />
      )}
    </>
  );
}
