import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface inputTextProps {
  label: string;
  onChange: Dispatch<SetStateAction<number>>;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  name: string;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    width: '90%',
    borderColor: '#8790E0',
  },
});

function InputNumeric({
  label,
  onChange,
  register,
  required,
  name,
}: inputTextProps) {
  return (
    <TextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(name, { required })}
      style={[styles.input, tw`py-3 pl-3 mt-3`]}
      placeholderTextColor="#8790E0"
      placeholder={label}
      keyboardType="numeric"
      maxLength={10}
      onChange={() => onChange}
      data-name={name}
    />
  );
}
export default InputNumeric;
