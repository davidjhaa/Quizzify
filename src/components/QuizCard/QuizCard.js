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
        <span>views 👁️</span>
      </div>
      <div>
        <span>Created On: &nbsp; &nbsp;{date}</span>
      </div>
    </div>
  );
}

export default QuizCard;
