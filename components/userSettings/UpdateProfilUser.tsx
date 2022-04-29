import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { UPDATE_USER } from '../../API/mutation/settings';
import InputAuth from '../form/InputAuth';
import InputText from '../form/InputText';

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
});
export default function UpdateProfilUser({ userId, setChoices }: IProps) {
  const { handleSubmit, control } = useForm();
  const navigation = useNavigation();

  // UPDATE USER
  const [updateUser, { error: errorUser }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      navigation.navigate('Userprofil', { id: userId });
    },
  });
  if (errorUser) return <Text>{errorUser.message}</Text>;

  const onSubmit: SubmitHandler<FieldValues> = (d) => {
    const dataUserUpdate = {
      updateUserId: userId,
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
    };

    if (d.newPasswordConfirm === d.newPassword) {
      updateUser({ variables: dataUserUpdate });
    }
  };

  return (
    <>
      <View style={tw`flex-row w-11/12 items-center justify-between`}>
        <View style={tw`w-2/4 mr-4`}>
          <InputText control={control} label="Firstname" name="firstName" />
        </View>
        <View style={tw`w-2/4`}>
          <InputText control={control} label="Lastname" name="lastName" />
        </View>
      </View>
      <View style={styles.inputAuth}>
        <InputAuth control={control} label="Email" name="email" type="email" />
      </View>
      <Pressable
        style={[styles.button, tw`mt-4 rounded-lg py-3 mr-4`]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tw`text-center font-bold text-sm text-white`}>
          Update my Profil
        </Text>
      </Pressable>
      <Text style={tw`text-center font-bold text-sm text-white mt-4`}>Or</Text>
      <Pressable
        style={[styles.buttonBack, tw`mt-4 rounded-lg py-5 mr-4`]}
        onPress={() => setChoices(false)}
      >
        <Text style={tw`text-center font-bold text-sm text-white`}>
          Back to choices
        </Text>
      </Pressable>
    </>
  );
}
