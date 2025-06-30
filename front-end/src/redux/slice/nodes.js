import { createSlice } from '@reduxjs/toolkit';

const nodesValSlice = createSlice({
  name: 'nodesVal',
  initialState: {
    nodesVal: [],
  },
  reducers: {
    setNodesVal: (state, action) => {
      state.nodesVal = action.payload;
    },
  },
});

export const { setNodesVal } = nodesValSlice.actions;
export default nodesValSlice.reducer;
