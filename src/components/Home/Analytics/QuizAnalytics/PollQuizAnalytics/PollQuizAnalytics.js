import React from "react";
import styles from "./PollQuizAnalytics.module.css";
import { ImCross } from "react-icons/im";

function PollQuizAnalytics({ quiz, onClose }) {
  return (
    <div className={styles.main}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ marginBottom: "16px" }}>
          {quiz.quizName} &nbsp; &nbsp; Question Analysis
        </h1>
        <ImCross
          style={{ color: "red", cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      {quiz.questions.map((question, index) => (
        <div>
          <h2>
            Q.{question.questionNumber} {question.questionText}
          </h2>
          <div style={{ display: "flex" }}>
            {question.options.map((option, idx) => (
              <div key={idx} className={styles.option}>
                <div style={{font:'bold'}}>{option.count}</div>
                <div>option {idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PollQuizAnalytics;
