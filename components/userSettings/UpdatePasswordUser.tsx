import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { UPDATE_USER_PASSWORD } from '../../API/mutation/settings';
import InputAuth from '../form/InputAuth';

interface IProps {
  userId: string;
  setChoices: Dispatch<SetStateAction<boolean>>;
}

const styles = StyleSheet.create({
  inputAuth: {
    width: '105%',
  },
  button: {
    backgroundColor: '#8790E0',
  },
  buttonBack: {
    backgroundColor: '#8132E5',
  },
  modal: {
    backgroundColor: '#8790E0',
  },
  buttonError: {
    backgroundColor: '#8132E5',
  },
});
export default function UpdatePasswordUser({ userId, setChoices }: IProps) {
  const { handleSubmit, control } = useForm();
  const navigation = useNavigation();

  // UPDATE PASSWORD
  const [updateUserPassword, { error: errorPassword }] = useMutation(
    UPDATE_USER_PASSWORD,
    {
      onCompleted: (data) => {
        console.log(data);
        navigation.navigate('Userprofil', { id: userId });
      },
    }
  );
  if (errorPassword) {
    Alert.alert('Oups !', 'Votre mot de passe est incorrect', [
      {
        text: 'Fermer',
        style: 'cancel',
      },
      { text: 'OK' },
    ]);
  }

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const dataPasswordUpdate = {
      updateUserPasswordId: userId,
      lastPassword: d.passwordUser,
      password: d.newPassword,
    };

    if (d.newPasswordConfirm === d.newPassword) {
      updateUserPassword({ variables: dataPasswordUpdate });
    } else {
      Alert.alert('Oups !', 'Vos mots de passes ne sont pas identiques', [
        {
          text: 'Fermer',
          style: 'cancel',
        },
        { text: 'OK' },
      ]);
    }
  };

  return (
    <View>
      <View>
        <View style={styles.inputAuth}>
          <InputAuth
            control={control}
            label="Password"
            name="passwordUser"
            type="password"
          />
        </View>
        <View style={styles.inputAuth}>
          <InputAuth
            control={control}
            label="New Password"
            name="newPassword"
            type="password"
          />
        </View>
        <View style={styles.inputAuth}>
          <InputAuth
            control={control}
            label="Confirm New Password"
            name="newPasswordConfirm"
            type="password"
          />
        </View>

        <Pressable
          style={[styles.button, tw`mt-4 rounded-lg py-3 mr-4`]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={tw`text-center font-bold text-sm text-white`}>
            Update my Password
          </Text>
        </Pressable>
        <Text style={tw`text-center font-bold text-sm text-white mt-4`}>
          Or
        </Text>
        <Pressable
          style={[styles.buttonBack, tw`mt-4 rounded-lg py-5 mr-4`]}
          onPress={() => setChoices(false)}
        >
          <Text style={tw`text-center font-bold text-sm text-white`}>
            Back to choices
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
