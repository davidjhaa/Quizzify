import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizQuestions.module.css";
import deleteIcon from "../../../../assets/delete.svg";
import QuizLink from "../QuizLink/QuizLink";
import axios from "axios";
const apiUrl = process.env.REACT_APP_Backend_URL;

const QuizQuestions = ({ quizName, quizType }) => {
  console.log(apiUrl);
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    questionText: "",
    options: [""],
    correctOption: "",
  });
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [optionType, setOptionType] = useState(
    localStorage.getItem("optionType") || "Text"
  );
  const [questionsLength, setQuestionsLength] = useState(0);
  const [timer, setTimer] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizLink, setQuizLink] = useState("");
  const [quizCreated, setQuizCreated] = useState(false);

  useEffect(() => {
    console.log(apiUrl);
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestionsLength(questions.length);
  }, []);

  const handleAddQuestion = async () => {
    if (question.questionText.trim() === "") {
      alert("Please enter question");
      return;
    }
    if (question.options.length < 2) {
      alert("Please add at least 2 options.");
      return;
    }
    for (let i = 0; i < question.options.length; i++) {
      if (question.options[i].trim() === "") {
        alert("Option cannot be empty.");
        return;
      }
    }
    if (question.options.length > 4) {
      alert("Maximum number of options allowed is 4.");
      return;
    }
    if (!localStorage.getItem("optionType")) {
      localStorage.setItem("optionType", JSON.stringify(optionType));
    }
    if (!localStorage.getItem("timer") && timer !== 0) {
      localStorage.setItem("timer", JSON.stringify(timer));
    }

    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const optionsWithCount = question.options.map((option) => ({
      option: option,
      count: 0,
    }));
    const newQuestion = {
      questionNumber: storedQuestions.length + 1,
      questionText: question.questionText,
      options: optionsWithCount,
      correctOption: selectedOption,
    };

    const updatedQuestions = [...storedQuestions, newQuestion];
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    setQuestion({
      questionNumber: 1,
      questionText: "",
      options: ["", ""],
    });

    setQuestionsLength(updatedQuestions.length + 1);
  };

  const handleOptionTypeSet = (type) => {
    if (!localStorage.getItem("optionType")) {
      setOptionType(type);
    }
  };

  const handleRemoveQuestion = (index) => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const updatedQuestions = storedQuestions.filter((_, idx) => idx !== index);

    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    if (updatedQuestions.length === 0) {
      localStorage.removeItem("optionType");
      localStorage.removeItem("timer");
      localStorage.removeItem("questions");
    }

    setQuestionsLength(updatedQuestions.length);
  };

  const handleQuestionChange = (event) => {
    setQuestion({
      ...question,
      questionText: event.target.value,
    });
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...question.options];
    newOptions[index] = event.target.value;
    setQuestion({
      ...question,
      options: newOptions,
    });
  };

  const handleRadioChange = (index, e) => {
    const selectedOptionIndex = question.options.findIndex(
      (option, idx) => idx === index
    );
    setSelectedOption(question.options[selectedOptionIndex]);
  };

  const handleOptionChange2 = (index, e, separator) => {
    const { name, value } = e.target;
    const newOptions = [...question.options];

    // Determine if the change is for text or image
    if (optionType === "Text+Image") {
      let [text, image] = newOptions[index].split(separator);
      if (name.startsWith("text_")) {
        text = value;
      } 
      else if (name.startsWith("image_")) {
        image = value;
      }
      newOptions[index] = `${text}${separator}${image}`;
    }

    // Update the options in the state
    setQuestion({
      ...question,
      options: newOptions,
    });
  };

  const handleAddOption = () => {
    setQuestion({
      ...question,
      options: [...question.options, ""],
    });
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    setQuestion({
      ...question,
      options: newOptions,
    });
  };

  const handleCreateQuiz = async () => {
    if (question.questionText !== "") {
      await handleAddQuestion();
    }
    let Questions = JSON.parse(localStorage.getItem("questions"));
    Questions = Questions.map((question, index) => ({
      ...question,
      questionNumber: index + 1,
    }));
    const optionType = JSON.parse(localStorage.getItem("optionType"));
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(
        "http://localhost:3001/quiz/createQuiz",
        {
          Questions,
          optionType,
          quizName,
          quizType,
          timer,
        }
      );
      if (response.status === 201) {
        const link = response.data.quizUrl;
        setQuizLink(link);
        setQuizCreated(true);
        localStorage.removeItem("questions");
        localStorage.removeItem("optionType");
        localStorage.removeItem("timer");
      }
    } catch (error) {
      console.error("Error creating quiz:", error.message);
    }
  };

  const handleCancel = () => {
    localStorage.setItem("activeButton", JSON.stringify("dashboard"));
    localStorage.removeItem("questions");
    localStorage.removeItem("optionType");
    localStorage.removeItem("timer");
    navigate("/dashboard");
  };

  const handleQuestionClick = (index) => {
    const questionArray = JSON.parse(localStorage.getItem("questions"));
    const clickedQuestion = questionArray[index];

    // Update the active question
    setActiveQuestion(index);

    // Update the question with the retrieved question data
    setQuestion({
      questionText: clickedQuestion.questionText,
      options: clickedQuestion.options,
      correctOption: clickedQuestion.correctOption,
    });

    // Update the selected option
    setSelectedOption(clickedQuestion.correctOption);

    // Update the option type from localStorage
    setOptionType(localStorage.getItem("optionType") || optionType);
  };

  const handleTimerClick = (value) => {
    setTimer(value);
    setClickedButton(value);
  };

  return (
    <div className="styles.main">
      {console.log(question.options)}
      {quizCreated ? (
        <div className={styles.modalOverlay1}>
          <div className={styles.modalContent}>
            <QuizLink quizLink={quizLink} />
          </div>
        </div>
      ) : (
        <div className={styles.quizContainer}>
          <div className={styles.questionNav}>
            <div className={styles.questionNumber}>
              {Array.from({
                length: questionsLength > 0 ? questionsLength : 1,
              }).map((_, index) => (
                <div key={index} className={styles.questionItem}>
                  <div
                    className={`${styles.questionCircle} ${
                      activeQuestion === index ? styles.active : ""
                    }`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={styles.closeButton}
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    &#10006;
                  </div>
                </div>
              ))}
              <div
                onClick={handleAddQuestion}
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  cursor: "pointer",
                  marginLeft: "15px",
                }}
              >
                {" "}
                &#43;
              </div>
            </div>
            <span>Max 5 questions</span>
          </div>
          <div className={styles.question}>
            <input
              className={styles.quizType}
              type="text"
              placeholder="Poll Question"
              value={question.questionText}
              onChange={handleQuestionChange}
            />
          </div>
          <div className={styles.optionType}>
            <span>OptionType</span>
            <div className={styles.radioButtons}>
              <div onClick={() => handleOptionTypeSet("Text")}>
                <input
                  type="radio"
                  id="Text"
                  name="option"
                  checked={optionType === "Text"}
                  disabled={localStorage.getItem("optionType") !== null}
                />
                <label for="Text">Text</label>
              </div>
              <div onClick={() => handleOptionTypeSet("Image")}>
                <input
                  type="radio"
                  id="Image"
                  name="option"
                  checked={optionType === "Image"}
                  disabled={localStorage.getItem("optionType") !== null}
                />
                <label for="Image">Image</label>
              </div>
              <div onClick={() => handleOptionTypeSet("Text+Image")}>
                <input
                  type="radio"
                  id="Text+Image"
                  name="option"
                  checked={optionType === "Text+Image"}
                  disabled={localStorage.getItem("optionType") !== null}
                />
                <label for="Text+Image">Text & Image</label>
              </div>
            </div>
          </div>
          <div className={styles.optionsContainer}>
            <div className={styles.optionsParent}>
              {question.options.map((option, index) => (
                <div key={index} className={styles.options}>
                  {optionType === "Text" && (
                    <React.Fragment>
                      <input
                        type="radio"
                        name="selectedOption"
                        checked={selectedOption === option}
                        onChange={() => handleRadioChange(index)}
                      />
                      <input
                        className={styles.option}
                        type="text"
                        placeholder="Text"
                        name={`text_${index}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e)}
                      />
                    </React.Fragment>
                  )}
                  {optionType === "Image" && (
                    <React.Fragment>
                      <input
                        type="radio"
                        name="selectedOption"
                        checked={selectedOption === option}
                        onChange={() => handleRadioChange(index)}
                      />
                      <input
                        className={styles.option}
                        type="text"
                        placeholder="image URL"
                        name={`image_${index}`}
                        onChange={(e) => handleOptionChange(index, e)}
                      />
                    </React.Fragment>
                  )}
                  {optionType === "Text+Image" && (
                    <div>
                      {question.options.map((option, index) => {
                        const separator = "davidjhaa"; 
                        const [text, imageUrl] = option.split(separator);
                        return (
                          <div key={index} style={{ display: "flex", alignItems: "center" }}>
                            <input
                              type="radio"
                              name="selectedOption"
                              checked={selectedOption === option}
                              onChange={() => handleRadioChange(index)}
                            />
                            <input
                              style={{ marginRight: "10px" }}
                              className={styles.option}
                              type="text"
                              placeholder="Text"
                              name={`text_${index}`}
                              value={text}
                              onChange={(e) =>
                                handleOptionChange2(index, e, separator)
                              }
                            />
                            <input
                              className={styles.option}
                              type="text"
                              placeholder="Image URL"
                              name={`image_${index}`}
                              value={imageUrl}
                              onChange={(e) =>
                                handleOptionChange2(index, e, separator)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <img
                    src={deleteIcon}
                    alt="Delete option"
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteOption(index)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.timer}>
              <div>Timer</div>
              <button
                className={`${styles.timerValue} ${
                  clickedButton === 5 ? styles.clicked : ""
                }`}
                onClick={() => handleTimerClick(5)}
                disabled={localStorage.getItem("timer") !== null}
              >
                5 sec
              </button>
              <button
                className={`${styles.timerValue} ${
                  clickedButton === 10 ? styles.clicked : ""
                }`}
                onClick={() => handleTimerClick(10)}
                disabled={localStorage.getItem("timer") !== null}
              >
                10 sec
              </button>
              <button
                className={`${styles.timerValue} ${
                  clickedButton === 15 ? styles.clicked : ""
                }`}
                onClick={() => handleTimerClick(15)}
                disabled={localStorage.getItem("timer") !== null}
              >
                15 sec
              </button>
            </div>
          </div>
          {question.options.length < 4 && (
            <button onClick={handleAddOption} className={styles.addOption}>
              Add Option
            </button>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className={styles.cancelButton}
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className={styles.createButton}
              onClick={() => handleCreateQuiz()}
            >
              Create Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
