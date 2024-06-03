import React from "react";
import { useLocation } from 'react-router-dom';
import victory from "../../../assets/victory.png";
import style from "./QuizResult.module.css";

function QuizResult() {
  const location = useLocation();
  const { state } = location;
  return (
    <div className={style.main}>
      <div className={style.parent}>
        <h1>Congrats {state?.quizType === 'Q&A' ? 'Quiz' : 'Poll'} is completed</h1>
        <img src={victory} alt="logo" style={{ width: "250px" }} />
        {state?.quizType === 'Q&A' && (
          <h1>
            Your Score is &nbsp;
            <span style={{ color: "greenyellow" }}>
              0{state?.score}/0{state?.length}{" "}
            </span>
          </h1>
        )}
      </div>
    </div>
  );
}

export default QuizResult;
