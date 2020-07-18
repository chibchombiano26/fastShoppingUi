import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adddUser, getExistentUsers } from "../../api/user";

const addUser = createAsyncThunk("users/addUser", async user => {
  return await adddUser(user);
});

type getUsersProps = {
  email: string;
};

const getUsers = createAsyncThunk(
  "users/getUsers",
  async (props: getUsersProps) => {
    return await getExistentUsers(props.email);
  }
);

const userSlice = createSlice({
  name: "UsersState",
  initialState: {
    user: {
      rememberMe: false
    },
    lastExistentResultsQuery: [],
    lastAddedUser: {}
  },
  reducers: {},
  extraReducers: {
    [addUser.fulfilled.toString()]: (state, { payload }) => {
      state.lastAddedUser = payload;
    },
    [getUsers.fulfilled.toString()]: (state, { payload }) => {
      state.lastExistentResultsQuery = payload;
    }
  }
});

export default userSlice;
export const userActions = {
  addUser,
  getUsers,
  ...userSlice.actions
};
