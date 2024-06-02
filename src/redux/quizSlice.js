import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  optionType: "",
  timer: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
    removeQuestion(state, action) {
      state.questions = state.questions.filter(
        (_, index) => index !== action.payload
      );
    },
    updateQuestion(state, action) { 
      const { question, index } = action.payload;
      state.questions[index] = question;
    }, 
    setOptionType(state, action) {
      state.optionType = action.payload;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    resetQuiz(state) {  
      return initialState;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  removeQuestion,
  updateQuestion,
  setOptionType,
  setTimer,
  resetQuiz,
} = quizSlice.actions;


export default quizSlice.reducer;
