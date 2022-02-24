import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import dateFormat from 'dateformat';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import tw from 'tailwind-react-native-classnames';

interface InputTextProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  label: string;
}
const styles = StyleSheet.create({
  datePicker: {
    width: 350,
    height: 100,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#8790E0',
    borderRadius: 5,
    marginVertical: 6,
    width: 350,
  },
  text: {
    color: '#8790E0',
  },
});

function InputDate({ setDate, date, label }: InputTextProps) {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showPicker = () => {
    if (isPickerShow === true) {
      setIsPickerShow(false);
    } else {
      setIsPickerShow(true);
    }
  };
  return (
    <View style={tw`mt-3`}>
      <Text style={[styles.text, tw`text-left w-full mb-2`]}>{label}</Text>
      <View style={styles.button}>
        <Button
          title={dateFormat(new Date(date), 'dddd dd mmmm yyyy')}
          onPress={showPicker}
        />
      </View>
      {isPickerShow && (
        <DateTimePicker
          textColor="#8790E0"
          style={styles.datePicker}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={date}
          onChange={onChange}
          mode="date"
        />
      )}
    </View>
  );
}
export default InputDate;
