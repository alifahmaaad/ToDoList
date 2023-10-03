import { createSlice } from "@reduxjs/toolkit";

export const TokenSlice = createSlice({
  name: "tokenReducer",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, deleteToken } = TokenSlice.actions;

export default TokenSlice.reducer;
