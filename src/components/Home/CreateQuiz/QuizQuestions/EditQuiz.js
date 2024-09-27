import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addQuestion } from '../../../../redux/quizSlice'; 
import styles from "./QuizQuestions.module.css";
import deleteIcon from "../../../../assets/delete.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import { setComponent } from "../../../../redux/componentSlice";


const EditQuiz = ({ quizName, quizType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions);
  const questionsLength = questions.length+1;
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [question, setQuestion] = useState({
    questionText: '',
    optionType: 'Text',
    options: ["",""],
    timer: '',
    correctOption: null
  })


  const handleAddQuestion = async () => {
    const newQuestion = {
      questionText: question.questionText,
      options: question.options,
      correctOption: question.correctOption,
      timer: question.timer || 0,
      optionType: question.optionType,
    };

    dispatch(addQuestion(newQuestion));

    setQuestion({
      questionText: '',
      options: ['', ''],
      correctOption: null,
      timer: 0,
      optionType: 'Text',
    });
    setActiveQuestion(questions.length);
  };

  const displayQuestion = (index) => {
    const selectedQuestion = questions[index];
    if (selectedQuestion) {
      setQuestion({
        questionText: selectedQuestion.questionText,
        options: selectedQuestion.options,
        correctOption: selectedQuestion.correctOption,
        timer: selectedQuestion.timer,
        optionType: selectedQuestion.optionType,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value, 
    }));
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...question.options];
    newOptions[index] = event.target.value;
    setQuestion({
      ...question,
      options: newOptions,
    });
  };

  const handleCorrectOption = (index) => {
    setQuestion({ ...question, correctOption: question.options[index] });
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
      correctOption: question.correctOption === newOptions[index] ? '' : question.correctOption,
    });
  };

  const createQuiz = async () => {
  //   if (question.questionText.trim() !== "") {
  //     handleAddQuestion();
  //   }

  //   if (storedQuestions.length === 0) {
  //     toast.error("At least one Question is required with options");
  //     return;
  //   }

  //   const Questions = storedQuestions.map((question, index) => ({
  //     questionNumber: index + 1,
  //     questionText: question.questionText,
  //     options: question.options,
  //     correctOption: quizType === 'Poll' ? null : question.correctOption,
  //   }));

  //   const token = localStorage.getItem("token");
  //   axios.defaults.headers.common["Authorization"] = token;

  //   try {
  //     const response = await axios.post(`${apiUrl}/quiz/createQuiz`, {
  //       Questions,
  //       optionType,
  //       quizName,
  //       quizType,
  //       timer,
  //     });

  //     if (response.status === 201 || response.status === 200) {
  //       const message = state?.edit ? "Quiz Updated Successfully" : "Quiz Created Successfully";
  //       toast.success(message, {
  //         position: "top-right",
  //       });

  //       if (response.data.quizId) {
  //         const link = `${window.location.origin}/quiz/${response.data.quizId}`
  //         setQuizLink(link);
  //         navigate('/quiz/link', { state: { quizLink: link, quizType } });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error creating/updating quiz:", error.message);
  //     toast.error("Failed to create/update quiz", {
  //       position: "top-right",
  //     });
  //   }
  };

  const handleCancel = async () => {
    dispatch(setComponent('dashboard'));
    navigate("/dashboard");
  }

  // const handleQuestionClick = (index) => {
  //   // if (activeIndex < storedQuestions.length) {
  //   //   dispatch(updateQuestion({ question, index: activeIndex }));
  //   // }

  //   // if (index < storedQuestions.length) {
  //   //   setQuestion({
  //   //     questionText: storedQuestions[index].questionText,
  //   //     options: storedQuestions[index].options.map((opt) => opt.option),
  //   //     correctOption: storedQuestions[index].correctOption,
  //   //   });
  //   // }

  //   // else if (index === storedQuestions.length) {
  //   //   setQuestion({
  //   //     questionText: "",
  //   //     options: ["", ""],
  //   //     correctOption: "",
  //   //   });
  //   // }
  //   // setActiveIndex(index);
  // };

  return (
    <div className={styles.overlay}>
      {console.log(questions.length)}
      <div className={styles.overlayContent}>
        <div className={styles.quizContainer}>
          <div className={styles.questionNav}>
            <div style={{display:'flex', gap:'18px', alignItems:'center'}}>
              {Array.from({ length: questionsLength }).map((_, index) => (
                <div 
                  key={index}
                  className={`${styles.questionCircle} ${index === activeQuestion ? styles.activeQuestion : ''}`}
                  onClick={() => displayQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
              {questionsLength < 5 && (
                <div
                  onClick={handleAddQuestion}
                  style={{cursor: "pointer" }}
                >
                  <FaPlus />
                </div>
              )}
            </div>
            <span>Max 5 questions</span>
          </div>
          <div className={styles.question}>
            <input
              className={styles.questionText}
              type="text"
              name="questionText"
              placeholder={`${quizType} Questions`}
              value={question.questionText}
              onChange={handleChange}
            />
          </div>
          <div className={styles.optionType}>
            <span>OptionType</span>
            <div className={styles.radioButtons}> 
            <div 
              onClick={() => handleChange({ target: { name: 'optionType', value: 'Text' } })}
              style={{cursor:'pointer'}}  
            >
                <input
                  type="radio"
                  name="optionType"
                  value="Text"
                  checked={question.optionType === "Text"}
                  readOnly
                />
                <span>Text</span>
              </div>
              <div 
                onClick={() => handleChange({ target: { name: 'optionType', value: 'Image' } })}
                style={{cursor:'pointer'}}
              >
                <input
                  type="radio"
                  name="optionType"
                  value="Image"
                  checked={question.optionType === "Image"}
                  readOnly
                />
                <span>Image</span>
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
                      onChange={() => handleCorrectOption(index)}
                    />
                  )}
                  {question.optionType === "Text" && (
                    <input
                    className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                      type="text"
                      placeholder="Text"
                      name={`text_${index}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
                  )}
                  {question.optionType === "Image" && (
                    <input
                    className={`${styles.option} ${question.correctOption === option ? styles.correctOption : ''}`}
                      type="text"
                      placeholder="Image URL"
                      name={`image_${index}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
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
            <button  className={styles.addOption} onClick={handleAddOption}>
              Add Option
            </button>
          )}
          <div className={styles.timer}>
            <h2 style={{ textAlign: 'center', fontFamily: 'cursive' }}>Timer</h2>
            {[5, 10, 15].map((time) => (
              <button
                key={time}
                name="timer"
                value={time}
                className={`${styles.timerValue} ${question.timer === time ? styles.clicked : ""}`}
                onClick={() => handleChange({ target: { name: 'timer', value: time } })}
              >
                {time} sec
              </button>
            ))}
          </div>
          <div className={styles.footer}>
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={styles.createButton}
              onClick={createQuiz}
            >
              Create Quiz
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default EditQuiz;