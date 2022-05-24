import { StyleSheet, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import SkeletonLoader from '../SkeletonLoader';

const styles = StyleSheet.create({
  row: {
    width: '95%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8790E0',
    padding: 10,
  },
});

export default function CardLoader() {
  return (
    <View style={[tw`my-3 rounded-md`, styles.row]}>
      <View style={tw`w-11/12`}>
        <SkeletonLoader variant="circle" height={12} width="30%" />
        <View style={tw`mt-4`}>
          <SkeletonLoader variant="circle" height={12} width="80%" />
        </View>
      </View>
      <SkeletonLoader variant="circle" height={30} width={30} />
    </View>
  );
}
