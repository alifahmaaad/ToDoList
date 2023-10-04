import { createSlice } from "@reduxjs/toolkit";

export const isLoginSlice = createSlice({
  name: "IsLoginReducer",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin: (state) => {
      state.token = true;
    },
    deleteIsLogin: (state) => {
      state.token = false;
    },
  },
});

export const { setIsLogin, deleteIsLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
