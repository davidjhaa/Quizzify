import React, { useEffect, useState } from "react";
import styles from './Q&A_Analytics.module.css'
import { ImCross } from "react-icons/im";

function QA_QuizAnalytics({ quiz, onClose }) {
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [correctAnswered, setCorrectAnswered] = useState(0);
  const [wrongAnswered, setWrongAnswered] = useState(0);

  const countQuizResults = (quiz) => {
    let totalAttempts = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    quiz.questions.forEach((question) => {
      totalAttempts += question.options.reduce(
        (acc, option) => acc + option.count,
        0
      );

      question.options.forEach((option) => {
        if (option.option === question.correctOption) {
          correctAnswers += option.count;
        } else {
          wrongAnswers += option.count;
        }
      });
    });

    setTotalAttempted(totalAttempts);
    setCorrectAnswered(correctAnswers);
    setWrongAnswered(wrongAnswers);
  };

  useEffect(() => {
    countQuizResults(quiz);
  }, [quiz]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>{quiz.quizName}.  Analysis</h1>
        <ImCross className={styles.closeIcon} onClick={onClose} />
      </div>
      {quiz.questions.map((question, index) => (
        <div key={index} className={styles.question}>
          <h2 className={styles.questionTitle}>
            Q.{question.questionNumber} {question.questionText}
          </h2>
          <div className={styles.resultsContainer}>
            <div className={styles.result}>
              {totalAttempted}
              <p>People Attempted Question</p>
            </div>
            <div className={styles.result}>
              {correctAnswered}
              <p>People Answered Correctly</p>
            </div>
            <div className={styles.result}>
              {wrongAnswered}
              <p>People Answered Incorrectly</p>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
}

export default QA_QuizAnalytics;
