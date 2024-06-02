import React from "react";
import victory from "../../../assets/victory.png";
import style from "./QuizResult.module.css";

function QuizResult() {
  const score = localStorage.getItem("result");
  const total = localStorage.getItem("total");
  console.log(score);
  return (
    <div className={style.main}>
      <div className={style.parent}>
        <h1>Congrats Quiz is completed</h1>
        <img src={victory} alt="logo" style={{ width: "250px" }} />
        {total !== 0 && (
          <h1>
            `Your Score is &nbsp;
            <span style={{ color: "greenyellow" }}>
              0{score}/0{total}{" "}
            </span>
          </h1>
        )}
      </div>
    </div>
  );
}

export default QuizResult;
