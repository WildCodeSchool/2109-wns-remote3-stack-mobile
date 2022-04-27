import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
// import * as ImageManipulator from 'expo-image-manipulator';

interface IProps {
  userFirstName: string;
  userAvatarUrl: string | null;
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
});

export default function UploadUpdateProfil({
  userFirstName,
  userAvatarUrl,
}: IProps) {
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
  const letter = userFirstName.split('')[0];

  return (
    <View>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button
        title="Take a picture"
        onPress={async () => {
          //   const pictureMetadata = await cameraRef.current.takePictureAsync();
          //   console.log('pictureMetadata', pictureMetadata);
          console.log(cameraRef);
        }}
      />
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
            tw`h-32 w-32  rounded-full flex items-center justify-center`,
            styles.defaultAvatar,
          ]}
        >
          <Text style={[tw`text-white`, styles.letter]}>{letter}</Text>
        </View>
      )}
    </View>
  );
}
