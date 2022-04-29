import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import UpdatePasswordUser from './UpdatePasswordUser';
import UpdateProfilUser from './UpdateProfilUser';

interface IProps {
  userId: string;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#8790E0',
  },
  buttonChange: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8790E0',
  },
});
export default function UpdateInfosUser({ userId }: IProps) {
  const [isPassword, setIsPassword] = useState(false);
  const [isChoice, setIsChoice] = useState(false);

  const choices = ['Change Profil', 'Change Password'];
  return (
    <View style={[styles.container, tw`w-full pl-3`]}>
      {!isChoice ? (
        <>
          {choices.map((choice) => (
            <Pressable
              style={[styles.buttonChange, tw`mt-6 rounded-lg py-5 mr-4`]}
              onPress={() => {
                setIsPassword(choice !== 'Change Profil');
                setIsChoice(true);
              }}
            >
              <Text style={tw`text-center font-bold text-lg text-white`}>
                {choice}
              </Text>
            </Pressable>
          ))}
        </>
      ) : (
        <View>
          {isPassword ? (
            <UpdatePasswordUser userId={userId} setChoices={setIsChoice} />
          ) : (
            <UpdateProfilUser userId={userId} setChoices={setIsChoice} />
          )}
        </View>
      )}
    </View>
  );
}
