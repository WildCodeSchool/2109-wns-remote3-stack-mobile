import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export interface UserState {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string | null;
}

interface UserStateWithLogged extends UserState {
  logged: boolean;
}

// TODO: improve dispatch types
interface ReturnUseUserFromStore {
  user: UserStateWithLogged;
  dispatchLogin: (payload: UserState) => {
    type: string;
    payload: UserState;
  };
  dispatchLogout: () => {
    type: string;
  };
  dispatchUser: (payload: UserState) => {
    type: string;
    payload: UserState;
  };
}

const initialState: UserStateWithLogged = {
  logged: false,
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  avatar: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => ({
      ...action.payload,
      logged: true,
    }),
    logout: () => initialState,
    update: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { login, logout, update } = userSlice.actions;

export const useUserFromStore = (): ReturnUseUserFromStore => {
  const user = useSelector(
    (state: { user: UserStateWithLogged }) => state.user
  );
  const dispatch = useDispatch();
  const dispatchLogin = (payload: UserState) => dispatch(login(payload));
  const dispatchLogout = () => dispatch(logout());
  const dispatchUser = (payload: UserState) => dispatch(update(payload));
  return {
    user,
    dispatchLogin,
    dispatchLogout,
    dispatchUser,
  };
};

export default userSlice.reducer;
