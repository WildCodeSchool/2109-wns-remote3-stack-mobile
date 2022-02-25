import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface InputAuthProps {
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  control: Control<FieldValues, string>;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    width: 350,
    borderColor: '#8790E0',
  },
});

function InputAuth({ label, name, type, control }: InputAuthProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }: FieldValues) => (
        <TextInput
          placeholderTextColor="#8790E0"
          secureTextEntry={type === 'password'}
          style={[styles.input, tw`py-3 pl-3 my-3 rounded-md`]}
          placeholder={label}
          value={value}
          onChangeText={(newText) => onChange(newText)}
        />
      )}
    />
  );
}
export default InputAuth;
