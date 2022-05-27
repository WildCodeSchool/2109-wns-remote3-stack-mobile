/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Homepage: undefined;
  Userprofil: { id: string | undefined };
  Settings: { id: string | undefined };
  Createtask: undefined;
  Login: undefined;
  notFound: undefined;
  Signup: undefined;
  TaskDetails: { id: string | undefined };
  DeleteProject: { id: string };
  ProjectDetails: { id: string };
  CreateUpdateproject: { id: string | undefined };
  DeleteTask: { id: string | undefined };
  CommentsTaskDetails: { id: string | undefined };
  AssignUsersTaskDetails: { id: string | undefined };
  NewFeedTaskDetails: { id: string | undefined; nameProject: string };
  DeleteComment: { id: string };
  UpdateStatus: { id: string | undefined };
  AssignedUserProject: { id: string | undefined };
  NewsFeedProject: { id: string | undefined };
  ProjectTasks: { id: string | undefined };
  UpdateProfilPicture: { id: string | undefined };
  Camera: { id: string | undefined };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Homepage: undefined;
  Projectlist: undefined;
  TaskList: undefined;
  Settings: { id: string | undefined };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
