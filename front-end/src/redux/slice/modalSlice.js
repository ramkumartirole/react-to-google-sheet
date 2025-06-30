import { createSlice } from '@reduxjs/toolkit';

const modalValSlice = createSlice({
  name: 'modalVal',
  initialState: {
    modalVal: 'farariCar',
  },
  reducers: {
    setModalValue: (state, action) => {
      state.modalVal = action.payload;
    },
  },
});

export const { setModalValue } = modalValSlice.actions;
export default modalValSlice.reducer;
