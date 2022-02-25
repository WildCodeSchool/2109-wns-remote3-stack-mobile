import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { GetAllProjects_getAllProjects } from '../../API/types/GetAllProjects';

interface SelectProjectProps {
  setProjectIdTask: Dispatch<SetStateAction<string>>;
  data: GetAllProjects_getAllProjects[];
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#ffff',
    fontSize: 18,
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: 340,
    marginBottom: 15,
  },
  inputAndroid: {
    color: '#ffff',
    fontSize: 18,
    borderBottomColor: '#8790E0',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: 340,
    marginBottom: 15,
  },
});

function SelectProject({ setProjectIdTask, data }: SelectProjectProps) {
  return (
    <View style={tw`flex-row w-full items-center pl-7`}>
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
        style={pickerSelectStyles}
        placeholder={{
          label: 'Select project',
        }}
        onValueChange={(value) => setProjectIdTask(value)}
        items={data.map((item) => {
          return { label: item.name, value: item.id };
        })}
      />
    </View>
  );
}
export default SelectProject;
