import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import tw from 'tailwind-react-native-classnames';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
// import * as ImageManipulator from 'expo-image-manipulator';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#8790E0',
  },
  close: {
    backgroundColor: 'black',
    opacity: 0.9,
  },
});
type RootStackParam = {
  id: { id: string };
};
type navProps = StackNavigationProp<RootStackParamList, 'UpdateProfilPicture'>;

export default function CameraUpdatePicture() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const navigation = useNavigation<navProps>();
  const { id } = route.params;
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(null || false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('UpdateProfilPicture', { id })}
        style={[tw`flex items-center w-full p-2`, styles.close]}
      >
        <AntDesign name="caretdown" size={24} color="#8790E0" />
      </Pressable>
      <Camera style={styles.camera} ref={cameraRef} />
      <Pressable
        style={[tw`w-full py-5 bg-red-200`, styles.button]}
        onPress={async () => {
          console.log(cameraRef);
        }}
      >
        <Text style={tw`text-center text-2xl text-white font-bold`}>
          Take a picture
        </Text>
      </Pressable>
    </>
  );
}
