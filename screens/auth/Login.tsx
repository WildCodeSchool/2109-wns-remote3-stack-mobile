import { useMutation } from '@apollo/client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LOGIN_MUTATION } from '../../API/mutation/login';
import { Login, LoginVariables } from '../../API/types/Login';
import InputAuth from '../../components/form/InputAuth';
import { useUserFromStore } from '../../store/slices/user.slice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 60,
  },
});

function LogIn() {
  const { handleSubmit, control } = useForm();
  const { dispatchLogin } = useUserFromStore();
  const [loginMutation] = useMutation<Login, LoginVariables>(LOGIN_MUTATION, {
    onCompleted: async (data: Login) => {
      await SecureStore.setItemAsync('token', data.login.token);
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
    <SafeAreaView style={styles.container}>
      <View>
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
      </View>
    </SafeAreaView>
  );
}
export default LogIn;
