import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  addQuestion,
  removeQuestion,
  setOptionType,
  updateQuestion,
  setTimer,
} from "../../../../redux/quizSlice";
import styles from "./QuizQuestions.module.css";
import deleteIcon from "../../../../assets/delete.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
const apiUrl = process.env.REACT_APP_Backend_URL;


const QuizQuestions = ({ quiz, quizType, setShowEdit }) => {
  const dispatch = useDispatch();
  const [storedOptionType, setStoredOptionType] = useState('');
  const[storedtimer, setStoredTimer] = useState('');
  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "",],
    correctOption:"",
  });
  const [questionsLength, setQuestionsLength] = useState(0)
  const [activeIndex, setActiveIndex] = useState('');


  useEffect(() => {
    console.log(quiz)
    console.log(quiz.optionType)
    if (quiz) {
      dispatch(setQuestions(quiz.questions));
      dispatch(setOptionType(quiz.optionType));
      dispatch(setTimer(quiz.timer));

      setQuestion({
        questionText: quiz.questions[0].questionText,
        options: quiz.questions[0].options.map((option) => option.option),
        correctOption: quiz.questions[0].correctOption ,
      });
      setStoredTimer(quiz.timer);
      setStoredOptionType(quiz.optionType)
      setActiveIndex(0);
      setQuestionsLength(quiz.questions.length)
    }
  }, [quiz]);

  const populateQuestion = (index) => {
    if (quiz.questions.length > 0 && index < quiz.questions.length) {
      const clickedQuestion = quiz.questions[index];
      setQuestion({
        questionText: clickedQuestion.questionText,
        options: clickedQuestion.options.map((opt) => opt.option),
        correctOption: clickedQuestion.correctOption,
      });
      setActiveIndex(index);
    }
    else{
      setQuestion({
        questionText: "",
        options: ["", ""],
        correctOption: null,
      });
      setActiveIndex(index)
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
      dispatch(setOptionType(storedOptionType));
    }
    if (storedtimer === 0) {
      dispatch(setTimer(storedtimer));
    }

    const optionsWithCount = question.options.map((option) => ({
      option: option,
      count: 0,
    }));

    const newQuestion = {
      questionNumber: question.length + 1,
      questionText: question.questionText,
      options: optionsWithCount,
      correctOption: quizType === "Poll" ? null : question.correctOption,
    };


    dispatch(addQuestion(newQuestion));
    setQuestionsLength(question.length + 1);
    setActiveIndex(question.length + 1);

    setQuestion({
      questionText: "",
      options: ["", ""],
      correctOption: "",
    });

  };

  const handleOptionTypeSet = (type) => {
    setStoredOptionType(storedOptionType);
  };

  const handleRemoveQuestion = (index) => {
    if (question.length > index) {
      dispatch(removeQuestion(index));

      if (question.length === 1) {
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
        setQuestionsLength(question.length - 1);
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

    if (storedOptionType === "Text+Image") {
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

  const handleUpdateQuiz = async () => {
    if (question.questionText.trim() !== "") {
      handleAddQuestion();
    }

    if (question.length === 0 || storedOptionType === "") {
      toast.error("At least one Question is required with options");
      return;
    }

    const Questions = question.map((question, index) => ({
      questionNumber: index + 1,
      questionText: question.questionText,
      options: question.options,
      correctOption: quizType === 'Poll' ? null : question.correctOption,
    }));

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    // try {
    //   const response = await axios.post(`${apiUrl}/quiz/createQuiz`, {
    //     Questions,
    //     optionType: storedOptionType,
    //     quizName,
    //     quizType,
    //     timer: storedTimer,
    //   });

    //   if (response.status === 201 || response.status === 200) {
    //     const message = state?.edit ? "Quiz Updated Successfully" : "Quiz Created Successfully";
    //     toast.success(message, {
    //       position: "top-right",
    //     });

    //     if (response.data.quizId) {
    //       const link = `${window.location.origin}/quiz/${response.data.quizId}`
    //       setQuizLink(link);
    //       navigate('/quiz/link', { state: { quizLink: link, quizType } });
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error creating/updating quiz:", error.message);
    //   toast.error("Failed to create/update quiz", {
    //     position: "top-right",
    //   });
    // }
  };

  const handleCancel = () => {
    setShowEdit(false)
  };

  const handleQuestionClick = (index) => {
    populateQuestion(index);
  };

  const handleTimerClick = (value) => {
    setStoredTimer(value);
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
              {question.length < 4 && (
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
                onClick={(e) => {
                  if (storedOptionType === "") {
                    handleOptionTypeSet("Text");
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <input
                  type="radio"
                  id="Text"
                  name="option"
                  checked={storedOptionType === "Text"}
                  // disabled={optionType !== ""}
                />
                <label htmlFor="Text">Text</label>
              </div>
              <div
                onClick={(e) => {
                  if (storedOptionType === "") {
                    handleOptionTypeSet("Image");
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <input
                  type="radio"
                  id="Image"
                  name="option"
                  checked={storedOptionType === "Image"}
                  // disabled={optionType !== ""}
                />
                <label htmlFor="Image">Image</label>
              </div>

              <div
                onClick={(e) => {
                  if (storedOptionType === "") {
                    handleOptionTypeSet("Text+Image");
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                <input
                  type="radio"
                  id="Text+Image"
                  name="option"
                  checked={storedOptionType === "Text+Image"}
                  // disabled={optionType !== ""}
                />
                <label htmlFor="Text+Image">Text & Image</label>
              </div>
            </div>
          </div>
          <div className={styles.optionsContainer}>
            <div className={styles.optionsParent}>
              {question.options.map((option, index) => (
                <div key={index} className={styles.options}>
                  <input
                    type="radio"
                    name="correctOption"
                    checked={question.correctOption === option}
                    onChange={() => handleRadioChange(index)}
                  />
                  {storedOptionType === "Text" && (
                    <input
                    className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                    type="text"
                      placeholder="Text"
                      name={`text_${index}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
                  )}
                  {storedOptionType === "Image" && (
                    <input
                      className={styles.option}
                      type="text"
                      placeholder="Image URL"
                      name={`image_${index}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
                  )}
                  {storedOptionType === "Text+Image" && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        style={{ marginRight: "28px" }}
                        className={styles.option}
                        type="text"
                        placeholder="Text"
                        name={`text_${index}`}
                        value={option.split("davidjhaa")[0] || ""}
                        onChange={(e) =>
                          handleOptionChange2(index, e, "davidjhaa")
                        }
                      />
                      <input
                        className={styles.option}
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
                  className={`${styles.timerValue} ${storedtimer === time ? styles.clicked : ""
                    }`}
                  onClick={() => handleTimerClick(time)}
                  disabled={storedtimer !== 0}
                >
                  {time} sec
                </button>
              ))}
            </div>
          <div className={styles.footer}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.createButton} onClick={handleUpdateQuiz}>
              Update Quiz
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default QuizQuestions;
