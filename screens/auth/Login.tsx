import { useMutation } from '@apollo/client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { LOGIN_MUTATION } from '../../API/mutation/login';
import { Login, LoginVariables } from '../../API/types/Login';
import InputAuth from '../../components/form/InputAuth';
import { useUserFromStore } from '../../store/slices/user.slice';

function LogIn() {
  const { handleSubmit, control } = useForm();
  const { dispatchLogin } = useUserFromStore();
  const [loginMutation] = useMutation<Login, LoginVariables>(LOGIN_MUTATION, {
    onCompleted: (data: Login) => {
      dispatchLogin(data.login);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    loginMutation({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <SafeAreaView>
      <InputAuth control={control} label="Email" name="email" type="email" />
      <InputAuth
        control={control}
        label="Password"
        name="password"
        type="password"
      />
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Se connecter</Text>
      </Pressable>
    </SafeAreaView>
  );
}
export default LogIn;
