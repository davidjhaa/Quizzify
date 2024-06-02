import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './componentSlice';
import quizReducer  from "./quizSlice";

export default configureStore({
  reducer: {
    component: componentReducer,
    quiz: quizReducer,
  },
});