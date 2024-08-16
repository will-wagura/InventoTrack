import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  role: string;
}

interface UserState {
  users: User[];
  error: string | null;
}

const initialState: UserState = {
  users: [],
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { fetchUsersSuccess, fetchUsersFailure, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;