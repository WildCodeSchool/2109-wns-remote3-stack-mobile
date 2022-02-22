import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import dateFormat from 'dateformat';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'tailwind-react-native-classnames';

interface inputTextProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}
const styles = StyleSheet.create({
  datePicker: {
    width: 350,
    height: 100,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#8790E0',
    borderRadius: 5,
    width: 350,
  },
});

function InputDate({ setDate, date }: inputTextProps) {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
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
      <View style={styles.button}>
        <Button
          title={dateFormat(new Date(date), 'dddd dd mmmm yyyy')}
          onPress={showPicker}
        />
      </View>
      {isPickerShow && (
        <DateTimePicker
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
