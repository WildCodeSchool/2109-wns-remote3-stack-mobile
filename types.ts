// import { NativeStackScreenProps } from '@react-navigation/native-stack';

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootStackParamList = {
  Root: undefined;
  Userprofil: undefined;
  Createtask: undefined;
};

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
//   NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Homepage: undefined;
  Projectlist: undefined;
  TaskList: undefined;
  Settings: undefined;
};
