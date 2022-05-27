import { StyleSheet, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import SkeletonLoader from '../SkeletonLoader';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#15192C',
    alignItems: 'center',
    paddingTop: 52,
  },
});

export default function PageLoader() {
  return (
    <View style={styles.container}>
      <View style={tw`flex flex-row justify-between items-center w-11/12`}>
        <SkeletonLoader variant="circle" height={20} width={20} />
        <SkeletonLoader variant="circle" height={14} width="70%" />
      </View>
      <View style={tw`w-11/12 mt-5`}>
        <SkeletonLoader variant="box" height={30} width="40%" />
        <SkeletonLoader variant="box" height={10} width="60%" />
        <View style={tw`flex flex-row justify-between  w-full`}>
          <SkeletonLoader variant="box" height={30} width="30%" />
          <View style={tw`w-3/12 flex flex-row justify-end`}>
            <View style={tw`mr-3`}>
              <SkeletonLoader variant="box" height={30} width={30} />
            </View>
            <SkeletonLoader variant="box" height={30} width={30} />
          </View>
        </View>
      </View>
      <View style={tw`w-11/12 mt-5`}>
        <SkeletonLoader variant="box" height={10} width="100%" />
        <SkeletonLoader variant="box" height={10} width="100%" />
        <SkeletonLoader variant="box" height={10} width="100%" />
        <SkeletonLoader variant="box" height={10} width="100%" />
        <SkeletonLoader variant="box" height={10} width="100%" />
        <SkeletonLoader variant="box" height={10} width="100%" />
        <SkeletonLoader variant="box" height={10} width="100%" />
      </View>
      <View style={tw`w-11/12 mt-5`}>
        <SkeletonLoader variant="box" height={50} width="100%" />
        <SkeletonLoader variant="box" height={50} width="100%" />
        <SkeletonLoader variant="box" height={50} width="100%" />
        <View style={tw`mt-5`}>
          <SkeletonLoader variant="box" height={50} width="100%" />
        </View>
      </View>
    </View>
  );
}
