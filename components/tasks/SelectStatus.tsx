import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

interface SelectStatusProps {
  setAdvancement: Dispatch<SetStateAction<string>>;
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#ffff',
    fontSize: 18,
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: 340,
  },
  inputAndroid: {
    color: '#ffff',
    fontSize: 18,
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: 340,
  },
});

function SelectStatus({ setAdvancement }: SelectStatusProps) {
  const arrayStatus = [
    {
      label: 'Todo',
      value: 'TO_DO',
    },
    {
      label: 'In Progress',
      value: 'IN_PROGRESS',
    },
    {
      label: 'Done',
      value: 'DONE',
    },
  ];
  return (
    <View style={tw`flex-row w-full justify-center my-5 items-center`}>
      <RNPickerSelect
        // eslint-disable-next-line react/no-unstable-nested-components
        Icon={() => {
          return (
            <Ionicons
              name="caret-down-outline"
              color="white"
              underlayColor="transparent"
              tvParallaxProperties={undefined}
              size={15}
            />
          );
        }}
        placeholder={{
          label: 'Select status',
        }}
        style={pickerSelectStyles}
        onValueChange={(value) => setAdvancement(value)}
        items={arrayStatus.map((item) => {
          return { label: item.label, value: item.value };
        })}
      />
    </View>
  );
}
export default SelectStatus;
