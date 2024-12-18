import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setComponent } from "../../../../redux/componentSlice";
import {
  setQuestions,
  addQuestion,
  removeQuestion,
  setOptionType,
  updateQuestion,
  setTimer,
} from "../../../../redux/quizSlice";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./QuizQuestions.module.css";
import deleteIcon from "../../../../assets/delete.svg";
import QuizLink from "../QuizLink/QuizLink";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
const apiUrl = process.env.REACT_APP_Backend_URL;


const QuizQuestions = ({ quizName, quizType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [stateData] = useState(state?.quiz);
  const storedOptionType = useSelector((state) => state.quiz.optionType);
  const storedTimer = useSelector((state) => state.quiz.timer);
  const storedQuestions = useSelector((state) => state.quiz.questions);

  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "",],
    correctOption: null,
  });
  const [optionType, setOptionTypeLocal] = useState(storedOptionType || "Text");
  const [questionsLength, setQuestionsLength] = useState(
    storedQuestions.length || 0
  );
  const [timer, setTimerLocal] = useState(storedTimer || 0);
  const [quizLink, setQuizLink] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    if (stateData) {
      dispatch(setQuestions(stateData.questions));
      dispatch(setOptionType(stateData.optionType));
      dispatch(setTimer(stateData.timer));

      setOptionTypeLocal(stateData.optionType);
      setTimerLocal(stateData.timer);
      setQuestionsLength(stateData.questions.length);

      if (stateData.questions.length > 0) {
        const firstQuestion = stateData.questions[0];
        setQuestion({
          questionText: firstQuestion.questionText,
          options: firstQuestion.options.map((option) => option.option),
          correctOption: firstQuestion.correctOption || "",
        });
      }
      setActiveIndex(0);
    }
  }, [stateData, dispatch]);

  useEffect(() => {
    setQuestionsLength(storedQuestions.length);
  }, [storedQuestions]);

  const populateQuestion = (index) => {
    if (storedQuestions.length > 0 && index < storedQuestions.length) {
      const clickedQuestion = storedQuestions[index];
      setQuestion({
        questionText: clickedQuestion.questionText,
        options: clickedQuestion.options.map((opt) => opt.option),
        correctOption: clickedQuestion.correctOption,
      });
      if (storedOptionType) {
        setOptionTypeLocal(storedOptionType);
      }
    }
  };

  const handleAddQuestion = async () => {
    if (question.questionText.trim() === "" || question.options.length < 2) {
      toast.error(
        "All fields are required and at least 2 options must be provided",
        {
          position: "top-right",
        }
      );
      return;
    }

    for (let i = 0; i < question.options.length; i++) {
      if (question.options[i].trim() === "") {
        toast.error("Option cannot be empty", {
          position: "top-right",
        });
        return;
      }
    }
    if (quizType !== "Poll" && !question.correctOption) {
      toast.error("Please select the correct option", {
        position: "top-right",
      });
      return;
    }
    if (storedOptionType === "") {
      dispatch(setOptionType(optionType));
    }
    if (storedTimer === 0) {
      dispatch(setTimer(timer));
    }

    const optionsWithCount = question.options.map((option) => ({
      option: option,
      count: 0,
    }));

    const newQuestion = {
      questionNumber: storedQuestions.length + 1,
      questionText: question.questionText,
      options: optionsWithCount,
      correctOption: quizType === "Poll" ? null : question.correctOption,
    };


    dispatch(addQuestion(newQuestion));
    setQuestionsLength(storedQuestions.length + 1);
    setActiveIndex(storedQuestions.length + 1);

    setQuestion({
      questionText: "",
      options: ["", ""],
      correctOption: "",
    });

  };

  const handleOptionTypeSet = (type) => {
    setOptionTypeLocal(type);
  };

  const handleRemoveQuestion = (index) => {
    if (storedQuestions.length > index) {
      dispatch(removeQuestion(index));

      if (storedQuestions.length === 1) {
        dispatch(setOptionType(""));
        dispatch(setTimer(0));
        dispatch(setQuestions([]));
        setQuestionsLength(0);
        setQuestion({
          questionText: "",
          options: ["", ""],
          correctOption: "",
        });
      }
      else {
        const newIndex = index > 0 ? index - 1 : 0;
        setQuestionsLength(storedQuestions.length - 1);
        setActiveIndex(newIndex);
        populateQuestion(newIndex);
      }
    }
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

  const handleRadioChange = (index) => {
    setQuestion({ ...question, correctOption: question.options[index] });
  };

  const handleOptionChange2 = (index, e, separator) => {
    const { name, value } = e.target;
    const newOptions = [...question.options];

    if (optionType === "Text+Image") {
      let [text = "", image = ""] = newOptions[index].split(separator);

      if (name.startsWith("text_")) {
        text = value;
      } else if (name.startsWith("image_")) {
        image = value;
      }

      newOptions[index] = `${text}${separator}${image}`;
    }

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
    if (question.questionText.trim() !== "") {
      handleAddQuestion();
    }

    if (storedQuestions.length === 0 || storedOptionType === "") {
      toast.error("At least one Question is required with options");
      return;
    }

    const Questions = storedQuestions.map((question, index) => ({
      questionNumber: index + 1,
      questionText: question.questionText,
      options: question.options,
      correctOption: quizType === 'Poll' ? null : question.correctOption,
    }));

    //   console.log('Stored Questions:', storedQuestions);
    // console.log('Formatted Questions:', Questions);

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.post(`${apiUrl}/quiz/createQuiz`, {
        Questions,
        optionType: storedOptionType,
        quizName,
        quizType,
        timer: storedTimer,
      });

      if (response.status === 201 || response.status === 200) {
        const message = state?.edit ? "Quiz Updated Successfully" : "Quiz Created Successfully";
        toast.success(message, {
          position: "top-right",
        });

        if (response.data.quizId) {
          const link = `${window.location.origin}/quiz/${response.data.quizId}`
          setQuizLink(link);
          navigate('/quiz/link', { state: { quizLink: link, quizType } });
        }
      }
    } catch (error) {
      console.error("Error creating/updating quiz:", error.message);
      toast.error("Failed to create/update quiz", {
        position: "top-right",
      });
    }
  };

  const handleCancel = () => {
    dispatch(setComponent("dashboard"));
    navigate("/dashboard");
  };

  const handleQuestionClick = (index) => {
    if (activeIndex < storedQuestions.length) {
      dispatch(updateQuestion({ question, index: activeIndex }));
    }

    if (index < storedQuestions.length) {
      setQuestion({
        questionText: storedQuestions[index].questionText,
        options: storedQuestions[index].options.map((opt) => opt.option),
        correctOption: storedQuestions[index].correctOption,
      });
    }

    else if (index === storedQuestions.length) {
      setQuestion({
        questionText: "",
        options: ["", ""],
        correctOption: "",
      });
    }
    setActiveIndex(index);
  };

  const handleTimerClick = (value) => {
    setTimerLocal(value);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <div className={styles.quizContainer}>
          <div className={styles.questionNav}>
            <div className={styles.questionNumber}>
              {Array.from({
                length: questionsLength > 0 ? questionsLength + 1 : 1,
              }).map((_, index) => (
                <div key={index} className={styles.questionItem}>
                  <div
                    className={`${styles.questionCircle} ${activeIndex === index ? styles.active : ''}`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    {index + 1}
                    <div
                      className={styles.closeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveQuestion(index);
                      }}
                    >
                      &#10006;
                    </div>
                  </div>
                </div>
              ))}
              {storedQuestions.length < 4 && (
                <div
                  onClick={handleAddQuestion}
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    cursor: "pointer",
                    marginLeft: "15px",
                  }}
                >
                  <FaPlus style={{ color: "gray" }} />
                </div>
              )}
            </div>
            <span>Max 5 questions</span>
          </div>
          <div className={styles.question}>
            <input
              className={styles.quizType}
              type="text"
              placeholder={`${quizType} Question`}
              value={question.questionText}
              onChange={handleQuestionChange}
            />
          </div>
          <div className={styles.optionType}>
            <span>OptionType</span>
            <div className={styles.radioButtons}>
              <div 
                style={{cursor:'pointer'}}
                onClick={(e) => {
                  if (storedOptionType === "") {
                    handleOptionTypeSet("Text");
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <input
                style={{cursor:'pointer'}}
                  type="radio"
                  id="Text"
                  name="option"
                  checked={optionType === "Text"}
                  disabled={storedOptionType !== ""}
                />
                <label htmlFor="Text" style={{cursor:'pointer'}}>Text</label>
              </div>
              <div 
                style={{cursor:'pointer'}}
                onClick={(e) => {
                  if (storedOptionType === "") {
                    handleOptionTypeSet("Image");
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <input
                style={{cursor:'pointer'}}
                  type="radio"
                  id="Image"
                  name="option"
                  checked={optionType === "Image"}
                  disabled={storedOptionType !== ""}
                />
                <label htmlFor="Image" style={{cursor:'pointer'}}>Image</label>
              </div>

              <div style={{cursor:'pointer'}}
                onClick={(e) => {
                  if (storedOptionType === "") {
                    handleOptionTypeSet("Text+Image");
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <input
                style={{cursor:'pointer'}}
                  type="radio"
                  id="Text+Image"
                  name="option"
                  checked={optionType === "Text+Image"}
                  disabled={storedOptionType !== ""}
                />
                <label htmlFor="Text+Image" style={{cursor:'pointer'}}>Text & Image</label>
              </div>
            </div>
          </div>
          <div className={styles.optionsContainer}>
            <div className={styles.optionsParent}>
              {question.options.map((option, index) => (
                <div key={index} className={styles.options}>
                  {quizType === "Q&A" && (
                    <input
                      style={{cursor:'pointer'}}
                      type="radio"
                      name="correctOption"
                      checked={question.correctOption === option}
                      onChange={() => handleRadioChange(index)}
                    />
                  )}
                  {optionType === "Text" && (
                    <input
                    className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                    type="text"
                      placeholder="Text"
                      name={`text_${index}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
                  )}
                  {optionType === "Image" && (
                    <input
                    className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                    type="text"
                      placeholder="Image URL"
                      name={`image_${index}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
                  )}
                  {optionType === "Text+Image" && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        style={{ marginRight: "28px" }}
                        className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                        type="text"
                        placeholder="Text"
                        name={`text_${index}`}
                        value={option.split("davidjhaa")[0] || ""}
                        onChange={(e) =>
                          handleOptionChange2(index, e, "davidjhaa")
                        }
                      />
                      <input
                    className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                    type="text"
                        placeholder="Image URL"
                        name={`image_${index}`}
                        value={option.split("davidjhaa")[1] || ""}
                        onChange={(e) =>
                          handleOptionChange2(index, e, "davidjhaa")
                        }
                      />
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
          </div>

          {question.options.length < 4 && (
            <button onClick={handleAddOption} className={styles.addOption}>
              Add Option
            </button>
          )}
          <div className={styles.timer}>
              <h2 style={{textAlign:'center', fontFamily:'cursive'}}>Timer</h2>
              {[5, 10, 15].map((time) => (
                <button
                  key={time}
                  className={`${styles.timerValue} ${timer === time ? styles.clicked : ""
                    }`}
                  onClick={() => handleTimerClick(time)}
                  disabled={storedTimer !== 0}
                >
                  {time} sec
                </button>
              ))}
            </div>
          <div className={styles.footer}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.createButton} onClick={handleCreateQuiz}>
              {state?.edit ? " Update Quiz " : " Create Quiz "}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default QuizQuestions;