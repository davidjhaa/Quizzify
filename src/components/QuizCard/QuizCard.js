import React, { useState, useEffect } from "react";
import styles from "./QuizCard.module.css";

function QuizCard({ q }) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const dateString = q.createdAt;
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    setDate(formattedDate);
  }, [q.createdAt]);

  return (
    <div className={styles.quizCard}>
      <div className={styles.quizInfo}>
        <span>{q.quizName}</span>
        <span style={{color:'#ee9e0a'}}>{q.totalViews} views 👁️</span>
      </div>
      <div>
        <span style={{color:'rgb(48 203 97)'}}>Created On : &nbsp;{date}</span>
      </div>
    </div>
  );
}

export default QuizCard;
