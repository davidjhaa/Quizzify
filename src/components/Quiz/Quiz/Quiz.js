import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";

const apiUrl = process.env.REACT_APP_Backend_URL;

const QuizDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizType, setQuizType] = useState(null);
  const [optionType, setOptionType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [initialTimer, setInitialTimer] = useState(0);
  const [timer, setTimer] = useState(null);
  const scoreRef = useRef(0);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`${apiUrl}/quiz/${id}`);
      const quiz = response.data;
      setQuestions(quiz.questions);
      setOptionType(quiz.optionType);
      setQuizType(quiz.quizType);
      if (quiz.timer > 0) {
        setInitialTimer(quiz.timer);
        setTimer(quiz.timer);
      }
    
      if (quiz.quizType === "Q&A") {
        const correctOptionsArray = response.data.questions.map(
          (question) => question.correctOption
        );
        setCorrectOptions(correctOptionsArray);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = async () => {
    if (quizType === "Q&A" && correctOptions[currentQuestionIndex] === selectedOption) {
      scoreRef.current++;
    }
    await axios.post(`${apiUrl}/quiz/${id}`, {
      qnumber: currentQuestionIndex,
      selected: selectedOption,
    });
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimer(initialTimer);  
    window.history.pushState(null, null, window.location.href);
  };

  const handleSubmitClick = async () => {
    if (quizType === "Q&A" && correctOptions[currentQuestionIndex] === selectedOption) {
      scoreRef.current++;
    }
    localStorage.setItem("result", scoreRef.current.toString());
    localStorage.setItem("total", questions.length.toString());

    await axios.post(`${apiUrl}/quiz/${id}`, {
      qnumber: currentQuestionIndex,
      selected: selectedOption,
    });

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
    } else if (timer === 0) {  
      if (currentQuestionIndex < questions.length - 1) {
        handleNextClick();
      } else {
        handleSubmitClick();  
      }
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex === questions.length) {
      navigate("/quiz/result");
    }
  }, [currentQuestionIndex, questions.length, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {console.log(timer)}
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
                currentQuestion?.options.map((optionObject, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(optionObject.option)}
                    className={
                      selectedOption === optionObject.option
                        ? styles.selectedOption
                        : styles.option
                    }
                  >
                    {optionObject.option}
                  </button>
                ))}
              {optionType === "Image" &&
                currentQuestion?.options.map((optionObject, index) => (
                  <img
                    key={index}
                    src={optionObject.option}
                    alt="optionImage"
                    className={`${styles.imageOption} ${
                      selectedOption === optionObject.option
                        ? styles.selectedImageOption
                        : ""
                    }`}
                    onClick={() => handleOptionClick(optionObject.option)}
                  />
                ))}
              {optionType === "Text+Image" &&
                currentQuestion?.options.map((optionObject, index) => {
                  const separator = "davidjhaa";
                  const [text, imageUrl] = optionObject.option.split(separator);
                  console.log(text);
                  return (
                    <div key={index} className={styles.textImageContainer}>
                      <div>{text}</div>
                      <img
                        src={imageUrl}
                        alt="option"
                        className={`${styles.imageOption} ${
                          selectedOption === optionObject.option
                            ? styles.selectedTextImageOption
                            : ""
                        }`}
                        onClick={() => handleOptionClick(optionObject.option)}
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
