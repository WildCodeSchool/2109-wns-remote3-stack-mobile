import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export interface ExpoTokenState {
  value: string;
}

interface ReturnUseExpoTokenFromStore {
  expoToken: ExpoTokenState;
  dispatchExpoToken: (token: ExpoTokenState) => {
    type: string;
    payload: ExpoTokenState;
  };
}

const initialState: ExpoTokenState = {
  value: '',
};

export const expoTokenSlice = createSlice({
  name: 'expoToken',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ExpoTokenState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { update } = expoTokenSlice.actions;

export const useExpoTokenFromStore = (): ReturnUseExpoTokenFromStore => {
  const expoToken = useSelector(
    (state: { expoToken: ExpoTokenState }) => state.expoToken
  );
  const dispatch = useDispatch();
  const dispatchExpoToken = (payload: ExpoTokenState) =>
    dispatch(update(payload));
  return {
    expoToken,
    dispatchExpoToken,
  };
};

export default expoTokenSlice.reducer;
