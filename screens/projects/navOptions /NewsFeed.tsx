import { Text, View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { GET_ALL_NOTIFICATION_PROJECT } from '../../../API/queries/projectQueries';

import CloseModal from '../../../components/CloseModal';
import OneNotification from '../../../components/newsfeed/OneNotification';
import { getAllNotifactionProject } from '../../../API/types/getAllNotifactionProject';
import ContainerLoader from '../../../components/animated/newsFeedLoaders/ContainerLoader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192C',
  },
  buttonActive: {
    backgroundColor: '#8790E0',
  },
  navigationContainer: {
    borderWidth: 2,
    borderColor: '#8790E0',
  },
});

type RootStackParam = {
  id: { id: string };
};

export default function NewsFeed() {
  const route = useRoute<RouteProp<RootStackParam>>();
  const { id } = route.params;

  const { loading, error, data } = useQuery<getAllNotifactionProject>(
    GET_ALL_NOTIFICATION_PROJECT,
    {
      variables: { objectId: id },
    }
  );

  if (loading) {
    return <ContainerLoader />;
  }
  if (error || !data) {
    return <Text>error</Text>;
  }

  return (
    <View style={[tw`px-4 py-5`, styles.container]}>
      <CloseModal path="ProjectDetails" id={id} />
      <Text style={tw`text-white text-lg my-2 font-bold`}>News feed</Text>
      <FlatList
        data={data.getAllNotificationsFromObject}
        keyExtractor={(notification) => notification.id}
        renderItem={({ item }) => <OneNotification item={item} />}
      />
    </View>
  );
}
