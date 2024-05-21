import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    component: 'dashboard',
};

const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setComponent: (state, action) => {
      state.component = action.payload;
    },
  },
});

export const { setComponent } = componentSlice.actions;
export const selectComponentClicked = (state) => state.component;
export default componentSlice.reducer;

