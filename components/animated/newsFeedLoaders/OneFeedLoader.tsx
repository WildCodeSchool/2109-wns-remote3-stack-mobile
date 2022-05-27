import { StyleSheet, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import SkeletonLoader from '../SkeletonLoader';

const styles = StyleSheet.create({
  row: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  spacing: {
    margin: 8,
  },
});

export default function SkeletonCard() {
  return (
    <View style={[tw`py-3`, styles.row]}>
      <SkeletonLoader variant="circle" height={50} width={50} />
      <View style={tw`w-full ml-5`}>
        <SkeletonLoader variant="circle" height={10} width="80%" />
        <SkeletonLoader variant="circle" height={8} width="50%" />
        <View style={tw`mt-5`}>
          <SkeletonLoader variant="circle" height={8} width="70%" />
        </View>
      </View>
    </View>
  );
}
