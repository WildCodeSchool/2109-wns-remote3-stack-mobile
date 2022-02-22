import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface inputTextProps {
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#8790E0',
    width: '90%',
    borderColor: '#8790E0',
  },
});

function InputText({ label, setLabel }: inputTextProps) {
  return (
    <TextInput
      multiline
      numberOfLines={10}
      placeholderTextColor="#8790E0"
      style={[styles.input, tw`py-3 pl-3 mt-3`]}
      placeholder={label}
      onChangeText={(newText) => setLabel(newText)}
    />
  );
}
export default InputText;
