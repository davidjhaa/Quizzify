import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";

const QuizDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizType, setquizType] = useState(null);
  const [optionType, setOptionType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctoptions, setCorrectoptions] = useState([]);
  const [timer, setTimer] = useState(0);
  const scoreRef = useRef(0);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/quiz/${id}`);
      const quiz = response.data;
      setQuestions(quiz.questions);
      setOptionType(quiz.optionType);
      setquizType(quiz.quizType);
      if (quiz.timer > 0) {
        setTimer(quiz.timer);
      }
      if (quiz.quizType === "Q&A") {
        const correctOptionsArray = response.data.questions.map(
          (question) => question.correctOption
        );
        setCorrectoptions(correctOptionsArray);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    if (quizType === "Q&A") {
      if (correctoptions[currentQuestionIndex] === selectedOption) {
        scoreRef.current++;
      }
    }
    setSelectedOption(null);
    setTimer(0);
    window.history.pushState(null, null, window.location.href);
  };

  const handleSubmitClick = () => {
    if (correctoptions[currentQuestionIndex] === selectedOption) {
      scoreRef.current++;
    }
    localStorage.setItem("result", scoreRef.current.toString());
    localStorage.setItem("total", questions.length);
    window.history.pushState(null, null, window.location.href);
    navigate("/quiz/result");
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer, currentQuestionIndex]);
    

  if (currentQuestionIndex >= questions.length) {
    navigate("/quiz/result");
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>{console.log(timer)}
      <div className={styles.appContainer}>
        <div className={styles.quizContainer}>
          <div className={styles.heading}>
            <div>{`${currentQuestionIndex + 1}/${questions.length}`}</div>
            {timer > 0 && (
              <div style={{ color: "red", fontWeight: "bold" }}>
                {`00:${timer}s`}
              </div>
            )}
          </div>

          {/* questions and options */}
          <div className={styles.questionSection}>
            <div className={styles.question}>
              {currentQuestion?.questionText}
            </div>
            <div className={styles.options}>
              {optionType === "Text" &&
                currentQuestion?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={
                      selectedOption === option
                        ? styles.selectedOption
                        : styles.option
                    }
                  >
                    {option}
                  </button>
                ))}
              {optionType === "Image" &&
                currentQuestion?.options.map((option, index) => (
                  <img
                    key={index}
                    src={option}
                    alt="optionImage"
                    className={`${styles.imageOption} ${
                      selectedOption === option
                        ? styles.selectedImageOption
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  />
                ))}
              {optionType === "Text+Image" &&
                currentQuestion?.options.map((option, index) => {
                  const separator = /david/;
                  const [text, imageUrl] = option.split(separator);
                  console.log(text);
                  return (
                    <div key={index}>
                      <div>{text}</div>
                      <img
                        src={imageUrl}
                        alt="option"
                        className={`${styles.imageOption} ${
                          selectedOption === option
                            ? styles.selectedImageOption
                            : ""
                        }`}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* button for next question */}
          <div className={styles.navigationButton}>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextClick} className={styles.nextButton}>
                NEXT
              </button>
            ) : (
              <button onClick={handleSubmitClick} className={styles.nextButton}>
                SUBMIT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizDetails;
