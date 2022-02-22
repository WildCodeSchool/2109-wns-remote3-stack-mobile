import React from 'react';
import { FieldValues, Controller, Control } from 'react-hook-form';
import { TextInput, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface inputTextProps {
  label: string;
  name: string;
  control: Control<FieldValues, string>;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    width: '90%',
    borderColor: '#8790E0',
  },
});

function InputText({ label, name, control }: inputTextProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }: FieldValues) => (
        <TextInput
          multiline
          numberOfLines={10}
          placeholderTextColor="#8790E0"
          style={[styles.input, tw`py-3 pl-3 mt-3`]}
          placeholder={label}
          value={value}
          onChangeText={(newText) => onChange(newText)}
        />
      )}
    />
  );
}
export default InputText;
