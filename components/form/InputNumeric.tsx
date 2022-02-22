import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface inputTextProps {
  label: string;
  onChange: Dispatch<SetStateAction<number>>;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    width: '90%',
    borderColor: '#8790E0',
  },
});

function InputNumeric({ label, onChange }: inputTextProps) {
  return (
    <TextInput
      style={[styles.input, tw`py-3 pl-3 mt-3`]}
      placeholderTextColor="#8790E0"
      placeholder={label}
      keyboardType="numeric"
      maxLength={10}
      onChange={() => onChange}
    />
  );
}
export default InputNumeric;
