import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  accessToken: '',
};

export const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDataSave: (state, action) => {
      const updatedData = {
        ...state.userData,
        ...action.payload,
      };
      return {
        ...state,
        userData: updatedData,
      };
    },
    userDataReset: (state) => {
      state.userData = initialState.userData;
    },
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  }
});

export const { userDataSave, accessToken, userDetailsSave, userDetailsReset, userDataReset } = userDataSlice.actions;

export default userDataSlice.reducer;
