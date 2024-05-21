import React, { useState } from 'react';
import styles from './DashBoard.module.css';
import QuizCard from '../../QuizCard/QuizCard';

const MainContent = () => {
  const[quiz, setQuiz] = useState([]);
  return (
    <div  className={styles.mainContent}>

      <div className={styles.stats}>
          <div className={styles.stat} style={{color : "orange"}}>
            <p>{quiz.length}  <span style={{marginLeft:"10px"}}>quiz</span> </p>
            <p>created</p>
          </div>
          <div className={styles.stat} style={{color : "#22803e"}}>
            <p>{quiz.questions}  Questions </p>
            <p>created</p>
          </div>
          <div className={styles.stat} style={{color : "blue"}}>
            <p>{quiz.views}  <span style={{marginLeft:"10px"}}>Total</span> </p>
            <p>Impressions</p>
          </div>
      </div>

      <div className={styles.trendingQuizzes}>
        <h2 className={styles.trendingTitle}>Trending Quizzes</h2>
        {quiz.length > 0 ? (
          quiz.map((q) => {
            <QuizCard value={q}/>
          })
        ) : (
          <p>No any quizzes right now</p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
