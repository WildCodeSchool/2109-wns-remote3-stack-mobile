import { useMutation } from '@apollo/client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { LOGIN_MUTATION } from '../../API/mutation/login';
import { Login, LoginVariables } from '../../API/types/Login';
import InputAuth from '../../components/form/InputAuth';
import { useUserFromStore } from '../../store/slices/user.slice';
import { RootStackParamList } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 60,
  },
});

type SignupScreenProps = StackNavigationProp<RootStackParamList, 'Signup'>;

function LogIn() {
  const { handleSubmit, control } = useForm();
  const { dispatchLogin } = useUserFromStore();
  const navigation = useNavigation<SignupScreenProps>();
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
          <Text style={tw`text-white`}>Se connecter</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={tw`text-white`}>
            Don&apos;t have an account? Signup here
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
export default LogIn;
