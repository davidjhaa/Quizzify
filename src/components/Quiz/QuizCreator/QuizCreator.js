import React, { useState, useEffect } from "react";
import styles from "./QuizCreator.module.css";
import deleteIcon from '../../../assets/delete.svg';

const QuizCreator = () => {
  const [question, setQuestion] = useState({
    questionText : "",
    options: ["" , ""],
    correctOption : ""
  });
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [optionType, setOptionType] = useState("Text");
  const [questionsLength, setQuestionsLength] = useState(0);

  useEffect(() => {
      const questions = JSON.parse(localStorage.getItem("questions")) || [];
      setQuestionsLength(questions.length);
  }, []);

  const handleAddQuestion = () => {
    if (question.questionText.trim() === "") {
      alert("Please enter question");
      return;
    }
    if (question.options.length < 2) {
      alert("Please add at least 2 options.");
      return;
    }
    if (question.options.length > 4) {
      alert("Maximum number of options allowed is 4.");
      return;
    }

    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const newQuestion = {
      questionText: question.questionText,
      optionType: optionType,
      options: question.options
    };

    const updatedQuestions = [...storedQuestions, newQuestion];
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    localStorage.setItem("optionType", optionType);
    
    setQuestion({
      questionText : "",
      options: ["", ""]
    });

    const newQuestionIndex = questionsLength + 1;
    setQuestionsLength(newQuestionIndex);
  };

  const handleOptionTypeSet = (type) => {
    if (!localStorage.getItem("optionType")) { // Check if optionType is not present in local storage
      setOptionType(type); // Set optionType in state
      localStorage.setItem("optionType", type); // Set optionType in local storage
    }
  };

  const handleRemoveQuestion = (index) => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const updatedQuestions = storedQuestions.filter((_, idx) => idx !== index);

    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    setQuestionsLength(updatedQuestions.length);
  };

  const handleQuestionChange = (event) => {
    setQuestion({
      ...question,
      questionText: event.target.value
    });
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...question.options];
    newOptions[index] = event.target.value;
    setQuestion({
      ...question,
      options: newOptions
    });
  };

  const handleAddOption = () => {
    setQuestion({
      ...question,
      options: [...question.options, ""]
    });
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    setQuestion({
      ...question,
      options: newOptions
    });
  };

  const handleCancel = () => {
    setQuestion({
      questionText: "",
      options: ["", ""],
      correctOption: ""
    });
    setActiveQuestion(1);
    setOptionType("Text");
  }

  const handleQuestionClick = (index) => {
    const questionarray = JSON.parse(localStorage.getItem("questions"))
    console.log(questionarray[index]);
    setActiveQuestion(index);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.quizCreator}>
        <div className={styles.questionNav}>
          <div className={styles.questionNumber}>
            {Array.from({ length: questionsLength > 0 ? questionsLength : 1 }).map((_, index) => (
              <div key={index} className={styles.questionItem}>
                <div
                  className={`${styles.questionCircle} ${activeQuestion === index ? styles.active : ""}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index+1}
                </div>
                <div className={styles.closeButton} onClick={() => handleRemoveQuestion(index)}>
                  &#10006;
                </div>
              </div>
            ))}
            <div onClick={handleAddQuestion} style={{fontWeight: 'bold', color: '#333', cursor:'pointer', marginLeft:'15px'}}> &#43;</div>
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
          <div className={styles.optionType}>
          <span>OptionType</span>
          <div className={styles.radioButtons}>
            <div onClick={() => setOptionType('Text')}>
              <input type="radio" id="Text" name="option" checked={optionType === 'Text'} />
              <label for="Text">Text</label>
            </div>
            <div onClick={() => setOptionType('Image')}>
              <input type="radio" id="Image" name="option" checked={optionType === 'Image'} />
              <label for="Image">Image</label>
            </div>
            <div onClick={() => setOptionType('Text+Image')}>
              <input type="radio" id="Text+Image" name="option" checked={optionType === 'Text+Image'}/>
              <label for="Text+Image">Text & Image</label>
            </div>
          </div>
        </div>
          {question.options.map((option, index) => (
            <div key={index} className={styles.options}>
              {optionType === "Text" && (
                <input
                  className={styles.option}
                  type="text"
                  placeholder='Text'
                  name="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e)}
                />
              )}
              {optionType === "Image" && (
                <input
                  className={styles.option}
                  type="text"
                  placeholder='image URL'
                  name="image"
                  onChange={(e) => handleOptionChange(index, e)}
                />
              )}
              {optionType === "Text+Image" && (
                <div style={{display:'flex',}}>
                  <input style={{marginRight:'10px'}}
                    className={styles.option}
                    type="text"
                    placeholder='Text'
                    name="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                  <input
                    className={styles.option}
                    type="text"
                    placeholder='image URL'
                    name="image"
                    onChange={(e) => handleOptionChange(index, e)}
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
          {question.options.length < 4 && (
            <button onClick={handleAddOption} className={styles.addOption}>Add Option</button>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className={styles.cancelButton} onClick={() => handleCancel()}>Cancel</button>
          <button className={styles.createButton}>Create Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;

