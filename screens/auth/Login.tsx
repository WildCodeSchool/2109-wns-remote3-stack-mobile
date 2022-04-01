import { useMutation } from '@apollo/client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
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
  },
  button: {
    backgroundColor: '#8790E0',
    shadowColor: '#8790E0',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.95,
    elevation: 18,
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
    Keyboard.dismiss();
    loginMutation({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image
        style={tw`h-20 w-60 mt-8 mb-6`}
        source={require('../../assets/images/logohome.png')}
      />
      <InputAuth control={control} label="Email" name="email" type="email" />
      <InputAuth
        control={control}
        label="Password"
        name="password"
        type="password"
      />
      <Pressable
        style={[tw`mt-5 w-11/12 py-3 rounded-md`, styles.button]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>
          Se connecter
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={tw`text-white mt-2`}>
          Don&apos;t have an account? Signup here
        </Text>
      </Pressable>
      <Image
        style={tw`relative bottom-0`}
        source={require('../../assets/images/HomeAsset.png')}
      />
    </KeyboardAvoidingView>
  );
}
export default LogIn;
