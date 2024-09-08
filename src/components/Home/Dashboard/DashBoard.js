import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.css";
import QuizCard from "../../Quiz/QuizCard/QuizCard";
import axios from "axios";

const MainContent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    try {
      async function fetchData() {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`${process.env.REACT_APP_Backend_URL}/quiz/stats`);
        setTotalQuiz(response.data.number_of_quizzes);
        setTotalQuestion(response.data.total_number_of_questions);
        setQuizzes(response.data.quiz);
        setTotalViews(response.data.totalViews);
      }
      fetchData();
    } catch (error) {
      console.log("Error fetching data: call not made");
    }
  }, []);

  return (
    <div className={styles.mainContent}>
      <div className={styles.stats}>
        <div className={styles.stat} style={{ color: "orange" }}>
          <div>
            <span style={{ fontSize: "34px", marginRight: "14px" }}>
              {totalQuiz}
            </span>{" "}
            Quiz
          </div>
          <p style={{ fontSize: "24px" }}>created</p>
        </div>
        <div className={styles.stat} style={{ color: "rgb(38 233 103)" }}>
          <div>
            <span style={{ fontSize: "34px", marginRight: "14px" }}>
              {totalQuestion}
            </span>{" "}
            Questions
          </div>
          <p style={{ fontSize: "24px" }}>created</p>
        </div>
        <div className={styles.stat} style={{ color: "blue" }}>
          <div>
            <span style={{ fontSize: "34px", marginRight: "14px" }}>
              {totalViews}
            </span>{" "}
            Total
          </div>
          <p style={{ fontSize: "24px" }}>Impression</p>
        </div>
      </div>
      <div className={styles.trendingQuizzes}>
        <h2 className={styles.trendingTitle}>Trending Quizzes</h2>
        <div className={styles.quizzesGrid}>
          {quizzes.length > 0 ? (
            quizzes.map((q, index) => <QuizCard key={index} q={q} />)
          ) : (
            <p>No any Quizzes right now</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
