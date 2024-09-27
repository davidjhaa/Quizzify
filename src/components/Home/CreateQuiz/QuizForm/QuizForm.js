import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizForm.module.css";
import QuizQuestions from "../../CreateQuiz/QuizQuestions/QuizQuestions";
import { useDispatch } from "react-redux";
import { setComponent } from "../../../../redux/componentSlice";
import { resetQuiz } from "../../../../redux/quizSlice";

const QuizForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("Q&A");
  const [showQuizCreator, setShowQuizCreator] = useState(false);

  dispatch(resetQuiz())

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizTypeChange = (type) => {
    setQuizType(type);
  };

  const handleSubmit = (e) => {
    // console.log(quizName, quizType)
    e.preventDefault();
    setShowQuizCreator(true);
  };

  const handleCancelBtn = () => {
    setShowQuizCreator(false);
    dispatch(setComponent('dashboard'))
    navigate("/dashboard");
  };

  return (
    <div className="styles.main">
      {showQuizCreator ? (
        <QuizQuestions quizName={quizName} quizType={quizType} />   
      ) : (
      <div className={styles.overlay}>
        <form onSubmit={handleSubmit} className={styles.formStyle}>
          <div className={styles.quizname}>
            <input
              type="text"
              value={quizName}
              onChange={handleQuizNameChange}
              className={styles.quizNameInput}
              placeholder="Quiz name"
              required
            />
          </div>
          <div className={styles.quizType}>
            <span>Quiz Type</span>
            <button
              type="button"
              onClick={() => handleQuizTypeChange("Q&A")}
              className={quizType === "Q&A" ? styles.activeButtonStyle : styles.buttonStyle}
              aria-pressed={quizType === "Q&A"}
            >
              Q & A
            </button>
            <button
              type="button"
              onClick={() => handleQuizTypeChange("Poll")}
              className={quizType === "Poll" ? styles.activeButtonStyle : styles.buttonStyle}
            >
              Poll
            </button>
          </div>
          <div className={styles.buttonContainerStyle}>
            <button
              type="button"
              onClick={handleCancelBtn}
              className={`${styles.buttonStyle} ${styles.cancelButtonStyle}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.buttonStyle} ${styles.continueButtonStyle}`}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      )}
    </div>
  );
};

export default QuizForm;
