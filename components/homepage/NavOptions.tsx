/* eslint-disable global-require */
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootTabParamList } from '../../types';

type menuCreateProjectScreenProps = StackNavigationProp<
  RootTabParamList,
  'TaskList'
>;
type navOptionstaskListScreenProps = StackNavigationProp<
  RootTabParamList,
  'TaskList'
> &
  menuCreateProjectScreenProps;
const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#8790E0',
    marginHorizontal: 12,
    borderRadius: 10,
  },
  text: {
    color: '#8790E0',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    padding: 5,
    borderRadius: 100,
    width: 35,
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#8790E0',
  },
});
export default function NavOptions() {
  const navigation = useNavigation<navOptionstaskListScreenProps>();
  return (
    <View style={tw`flex flex-row`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TaskList')}
        style={styles.card}
      >
        <Text style={styles.text}>Tasks</Text>
        <Image
          style={tw`w-36 h-44`}
          source={require('../../assets/images/tasklist.png')}
        />
        <Icon
          style={styles.icon}
          name="arrowright"
          tvParallaxProperties
          color="#8790E0"
          type="antdesign"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Projectlist')}
        style={styles.card}
      >
        <Text style={styles.text}>Project</Text>
        <Image
          style={tw`w-36 h-44`}
          source={require('../../assets/images/projects.png')}
        />
        <Icon
          style={styles.icon}
          name="arrowright"
          tvParallaxProperties
          color="#8790E0"
          type="antdesign"
        />
      </TouchableOpacity>
    </View>
  );
}
