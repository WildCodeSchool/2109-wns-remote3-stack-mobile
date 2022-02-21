import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const styles = StyleSheet.create({
  container: { height: '42%', marginTop: 20, textAlign: 'left', width: '93%' },
  text: {
    color: '#8790E0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default function NewsFeed() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>News feed</Text>
      <View style={tw`mt-2 border-t border-purple-300 pt-2`}>
        <Text style={tw`text-white`}>Feed empty</Text>
      </View>
    </View>
  );
}
