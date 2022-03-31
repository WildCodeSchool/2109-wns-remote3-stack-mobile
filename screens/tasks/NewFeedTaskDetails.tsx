import { useQuery } from '@apollo/client';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { GET_NEW_FEED_TASK } from '../../API/queries/newFeedTasks';
import { GetNotificationByID_getNotificationByID } from '../../API/types/GetNotificationByID';
import CloseModal from '../../components/CloseModal';
import Loader from '../../components/Loader';
import OneFeedTask from '../../components/tasks/newfeed/OneFeedTask';
import { getNewFeedTask_getAllNotificationsFromObject } from '../../API/types/getNewFeedTask';

type paramsProps = {
  id: { id: string; nameProject: string };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15192C',
  },
  flatlist: {
    height: '88%',
    flexGrow: 0,
  },
});
export default function NewFeedTaskDetails() {
  const route = useRoute<RouteProp<paramsProps>>();
  // FETCH NEW FEED
  const { loading, error, data } = useQuery(GET_NEW_FEED_TASK, {
    variables: { objectId: route.params.id },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <Text> error </Text>;
  }

  const newFeedTaskId = data.getAllNotificationsFromObject.filter(
    (feeds: getNewFeedTask_getAllNotificationsFromObject) => {
      return feeds.modifiedObjectId.includes(route.params.id);
    }
  );

  const renderItem = ({
    item,
  }: {
    item: GetNotificationByID_getNotificationByID;
  }) => <OneFeedTask item={item} projectName={route.params.nameProject} />;
  return (
    <View style={[styles.container, tw`w-full h-full`]}>
      <CloseModal path="TaskDetails" id={route.params.id} />
      <FlatList
        data={newFeedTaskId.reverse()}
        style={[styles.flatlist, tw`mx-6`]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
