import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

interface IProps {
  description: string;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 18,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderColor: '#8790E0',
    paddingBottom: 6,
  },
});

export default function ProjectDescription({ description }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={tw`font-bold text-white text-base`}>Description</Text>
      </View>
      <ScrollView>
        <Text style={tw`text-white leading-6 border border-white mt-3`}>
          {description}
        </Text>
      </ScrollView>
    </View>
  );
}
