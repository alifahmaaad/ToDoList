import { createSlice } from "@reduxjs/toolkit";

export const isLoginSlice = createSlice({
  name: "IsLoginReducer",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true;
    },
    deleteIsLogin: (state) => {
      state.isLogin = false;
    },
  },
});

export const { setIsLogin, deleteIsLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
