import { useMutation } from '@apollo/client';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { SIGNUP_MUTATION } from '../../API/mutation/signup';
import { Signup, SignupVariables } from '../../API/types/Signup';
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

type LoginScreenProps = StackNavigationProp<RootStackParamList, 'Login'>;

function SignUp() {
  const { handleSubmit, control } = useForm();
  const { dispatchLogin } = useUserFromStore();
  const navigation = useNavigation<LoginScreenProps>();
  const [signupMutation] = useMutation<Signup, SignupVariables>(
    SIGNUP_MUTATION,
    {
      onCompleted: async (data: Signup) => {
        await SecureStore.setItemAsync('token', data.signup.token);
        dispatchLogin(data.signup);
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    if (data.password === data.confirmPassword) {
      signupMutation({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`text-white font-bold text-2xl mt-10 mb-5`}>
        Create your account
      </Text>
      <InputAuth
        control={control}
        label="First name"
        name="firstName"
        type="text"
      />
      <InputAuth
        control={control}
        label="Last name"
        name="lastName"
        type="text"
      />
      <InputAuth control={control} label="Email" name="email" type="email" />
      <InputAuth
        control={control}
        label="Password"
        name="password"
        type="password"
      />
      <InputAuth
        control={control}
        label="Confirm password"
        name="confirmPassword"
        type="password"
      />
      <Pressable
        style={[tw`my-5 w-11/12 py-3 rounded-md`, styles.button]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tw`text-white text-center font-bold text-lg`}>Signup</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-white`}>Already have an account? Login here</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default SignUp;
