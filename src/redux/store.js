import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './componentSlice';
import questionsReducer from "./questionsSlice";

export default configureStore({
  reducer: {
    component: componentReducer,
    questions: questionsReducer,
  },
});