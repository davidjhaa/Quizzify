import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizForm.module.css";
import QuizQuestions from "../../CreateQuiz/QuizQuestions/QuizQuestions";

const QuizForm = () => {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("Q&A");
  const [showQuizCreator, setShowQuizCreator] = useState(false);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizTypeChange = (type) => {
    setQuizType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQuizCreator(true);
  };

  const handleCancelBtn = () => {
    localStorage.setItem('activeButton', 'dashboard')
    setShowQuizCreator(false);
    navigate("/dashboard");
  };

  return (
    <div className="styles.main">
      {showQuizCreator ? (
        <div className={styles.modalOverlay1}>
          <div className={styles.modalContent}>
            <QuizQuestions quizName={quizName} quizType={quizType} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formStyle}>
          <div className={styles.question}>
            <input
              type="text"
              value={quizName}
              onChange={handleQuizNameChange}
              className={styles.quizName}
              placeholder="Quiz name"
              required
            />
          </div>
          <div className={styles.quizType}>
            <span style={{ fontSize: "22px" }}>Quiz Type</span>
            <button
              type="button"
              onClick={() => handleQuizTypeChange("Q&A")}
              className={
                quizType === "Q&A"
                  ? styles.activeButtonStyle
                  : styles.buttonStyle
              }
            >
              Q & A
            </button>
            <button
              type="button"
              onClick={() => handleQuizTypeChange("poll")}
              className={
                quizType === "poll"
                  ? styles.activeButtonStyle
                  : styles.buttonStyle
              }
            >
              Poll Type
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
     )}
    </div>
  );
};

export default QuizForm;
