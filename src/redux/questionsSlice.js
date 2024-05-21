import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [{}], // Initial state with an array containing an empty object
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state) => {
      state.questions.push({}); // Add a new empty question object
    },
    removeQuestion: (state, action) => {
      state.questions.splice(action.payload, 1); // Remove question at specified index
    },
    updateQuestion: (state, action) => {
      const { index, question } = action.payload;
      state.questions[index] = { ...state.questions[index], ...question }; // Update question at specified index
    },
  },
});

export const { addQuestion, removeQuestion, updateQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
