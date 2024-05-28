import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Analytics.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { HiShare } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_Backend_URL;

function Analytics() {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/quiz/analytics");
      if (response.status === 200) {
        setQuizzes(response.data.quiz);
      }
    } catch (error) {
      console.log("something went wrong, cant fetch analytics of quiz");
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.analyticsContainer}>
        <div className={styles.title}>Analytics</div>
        {quizzes.length > 0 &&
          quizzes.map((quiz, index) => {
            const dateObj = new Date(quiz.createdAt);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <div key={index} className={styles.quizItem}>
                <span>{quiz.quizName}</span>
                <span>{formattedDate}</span>
                <span>{quiz.totalViews}</span>
                <div style={{ display: "flex" }}>
                  <FaRegEdit style={{ color: "blue" }} />
                  <MdDeleteOutline style={{ color: "red" }} />
                  <HiShare style={{ color: "green" }} />
                </div>
                <span>
                  <a href={`/quiz/${quiz._id}`} className={styles.link}>
                    Question wise Analysis
                  </a>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Analytics;
