import React, { useEffect, useState } from "react";
import axios from 'axios'
import styles from "./Analytics.module.css";

function Analytics() {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/quiz/analytics");
      if (response.status === 200) {
        setQuizzes(response.data);
      }
    } 
    catch (error) {
      console.log('something went wrong, cant fetch analytics of quiz')
    }
  };

  useEffect(() => {
  });

  return (
    <div className={styles.main}>
      <div>Analytics</div>
    </div>
  );
}

export default Analytics;
