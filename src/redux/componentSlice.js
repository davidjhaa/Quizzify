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
export const selectComponent = (state) => state.component.component;
export default componentSlice.reducer;

