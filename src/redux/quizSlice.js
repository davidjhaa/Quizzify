import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload.map((question, index) => ({
        index,
        questionText: question.questionText,
        options: question.options,
        correctOption: question.correctOption,
        timer: question.timer || 0,
        optionType: question.optionType || "",
      }));
    },
    addQuestion(state, action) {
      const newQuestion = {
        index: state.questions.length, 
        questionText: action.payload.questionText,
        options: action.payload.options,
        correctOption: action.payload.correctOption,
        timer: action.payload.timer || 0,
        optionType: action.payload.optionType || "",
      };
      state.questions.push(newQuestion);
    },
    removeQuestion(state, action) {
      state.questions = state.questions.filter(
        (_, index) => index !== action.payload
      );
      // Recalculate the index of each question after removal
      state.questions.forEach((question, index) => {
        question.index = index;
      });
    },
    updateQuestion(state, action) {
      const { question, index } = action.payload;
      if (index < state.questions.length) {
        state.questions[index] = {
          ...state.questions[index], // Keep existing question structure
          questionText: question.questionText,
          options: question.options,
          correctOption: question.correctOption,
          timer: question.timer,
          optionType: question.optionType,
        };
      }
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
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
