import React from 'react';
import { FieldValues, Controller, Control } from 'react-hook-form';
import { TextInput, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface InputTextProps {
  label: string;
  name: string;
  control: Control<FieldValues, string>;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    borderColor: '#8790E0',
  },
});

function InputText({ label, name, control }: InputTextProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }: FieldValues) => (
        <TextInput
          returnKeyType="done"
          keyboardType="default"
          blurOnSubmit
          multiline
          numberOfLines={10}
          placeholderTextColor="#8790E0"
          style={[styles.input, tw`py-3 w-full pl-3 my-3 rounded-md`]}
          placeholder={label}
          value={value}
          onChangeText={(newText) => onChange(newText)}
        />
      )}
    />
  );
}
export default InputText;
