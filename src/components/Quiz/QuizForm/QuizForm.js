import React, { useState } from 'react';
import styles from './QuizForm.module.css'

const QuizForm = () => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('Q & A');

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizTypeChange = (type) => {
    setQuizType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quiz Name:', quizName);
    console.log('Quiz Type:', quizType);
  };

  const handleCancelBtn = () => {
    setQuizName('');
    setQuizType('Q & A');
  }

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <input
          type="text"
          value={quizName}
          onChange={handleQuizNameChange}
          className={styles.inputStyle}
          placeholder="Quiz name"
          required
        />
        <div className={styles.quizType}>
          <span style={{fontSize : '22px'}}>Quiz Type</span>
          <button
            type="button"
            onClick={() => handleQuizTypeChange('Q & A')}
            className={quizType === 'Q & A' ? styles.activeButtonStyle : styles.buttonStyle}          >
            Q & A
          </button>
          <button
            type="button"
            onClick={() => handleQuizTypeChange('Poll Type')}
            className={quizType === 'Poll Type' ? styles.activeButtonStyle : styles.buttonStyle}          >
            Poll Type
          </button>
        </div>
        <div className={styles.buttonContainerStyle}>
          <button type="button" onClick={() => handleCancelBtn()} className={styles.cancelButtonStyle}>
            Cancel
          </button>
          <button type="submit" className={styles.continueButtonStyle}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};


export default QuizForm;
