import React, { useState } from "react";
import styles from "./QuizCreator.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, removeQuestion, updateQuestion } from "../../../redux/questionsSlice";
import deleteIcon from '../../../assets/delete.svg';

const QuizCreator = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({
    questionText : "",
    options: [{ text: "" }]
  });
  const [activeQuestion, setActiveQuestion] = useState(1);

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleRemoveQuestion = (index) => {
    dispatch(removeQuestion(index));
  };

  const handleQuestionChange = (event) => {
    setQuestion({
      ...question,
      questionText: event.target.value
    });
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...question.options];
    newOptions[index].text = event.target.value;
    setQuestion({
      ...question,
      options: newOptions
    });
  };

  const handleAddOption = () => {
    setQuestion({
      ...question,
      options: [...question.options, { text: "" }]
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

  const handleQuestionClick = (index) => {
    setActiveQuestion(index);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.quizCreator}>
        <div className={styles.questionNav}>
          <div className={styles.questionNumber}>
            {question.options.map((_, index) => (
              <div key={index} className={styles.questionItem}>
                <div
                  className={`${styles.questionCircle} ${activeQuestion === index ? styles.active : ""}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index + 1}
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
        <div className={styles.optionType}>
          <span>OptionType</span>
          <div className={styles.radioButtons}>
            <div>
              <input type="radio" id="Text" name="option" />
              <label for="Text">Text</label>
            </div>
            <div>
              <input type="radio" id="Image" name="option" />
              <label for="Image">Image</label>
            </div>
            <div>
              <input type="radio" id="Text+Image" name="option" />
              <label for="Text+Image">Text & Image</label>
            </div>
          </div>
        </div>
        <div className={styles.question}>
          <input
            className={styles.quizType}
            type="text"
            placeholder="Poll Question"
            value={question.questionText}
            onChange={handleQuestionChange}
            />
          {question.options.map((option, index) => (
            <div key={index} className={styles.options}>
              <input
                className={styles.option}
                type="text"
                placeholder={`Option ${index + 1}`}
                name="text"
                value={option.text}
                onChange={(e) => handleOptionChange( index, e)}
              />
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
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.createButton}>Create Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;

