/**
 * 发起API请求
 */
import {
  createAsyncThunk,
  createSlice,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface User {
  value: number;
  message: string;
}
export interface Params {
  value: number;
  key: string;
}

const initialState: User = {
  value: 0,
  message: 'asd',
};

//定义action
const httpTest = createAction('httpTest');

// First, create the thunk
export const fetchUserById = createAsyncThunk('httpTest', async () => {
  const response = 'res';
  return response;
});

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<Params>) => {
      state.value += action.payload.value;
    },
  },
  // http请求
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action: any) => {
      state.message = action.payload.message;
    });
  },
});

export const { increment, decrement, incrementByAmount } = usersSlice.actions;

export default usersSlice.reducer;
