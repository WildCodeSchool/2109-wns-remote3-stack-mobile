import React from 'react';
// import { useQuery } from '@apollo/client';
import { Text, View } from 'react-native';

// import { GET_ALL_TASKS } from '../../API/queries/taskQueries';
// // eslint-disable-next-line camelcase
// import { GetAllTasks_getAllTasks } from '../../API/types/GetAllTasks';

// interface IResponse {
//   // eslint-disable-next-line camelcase
//   getAllTasks: GetAllTasks_getAllTasks[];
// }
function TaskList() {
  //   // FETCH THE TASK LIST
  //   const { loading, error, data } = useQuery<IResponse>(GET_ALL_TASKS);

  //   if (loading) {
  //     return <Text>...loading </Text>;
  //   }
  //   if (error || !data) {
  //     return <Text> error </Text>;
  //   }
  //   console.log(data.getAllTasks);

  //   const Item = ({ getAllTasks }: IResponse) => (
  //     <View>
  //       <Text>{}</Text>
  //     </View>
  //   );

  //   const App = () => {
  //   const renderItem = ({ name }) => (
  //     <Item name={man} />
  //   );
  return (
    <View>
      <Text>tasklist view</Text>
      {/* <FlatList
      data={data.getAllTasks}
      keyExtractor={data.getAllTasks}
    /> */}
    </View>
  );
}
export default TaskList;
