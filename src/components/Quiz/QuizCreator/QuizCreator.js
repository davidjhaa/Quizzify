import React, { useState } from "react";
import styles from "./QuizCreator.module.css";

const QuizCreator = ({ qName, qType }) => {
  const [questions, setQuestions] = useState([
    { text: "", options: [{ text: "", imageUrl: "" }] },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: [{ text: "", imageUrl: "" }] },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex][event.target.name] =
      event.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: "", imageUrl: "" });
    setQuestions(newQuestions);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.quizCreator}>
        <div className={styles.questionNav}>
          <div className={styles.qNumber}>
            {questions.map((_, index) => (
              <div key={index} className={styles.questionCircle}>
                {index + 1}
              </div>
            ))}
            <div onClick={addQuestion}>+</div>
          </div>
          <span>Max 5 Questions</span>
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className={styles.question}>
            <input
              className={styles.quizType}
              type="text"
              placeholder="Poll Question"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, e)}
            />
            <div className={styles.optionType}>
                <span>Option Type</span>
                <div>
                    <input type="radio" value="text" name="optionType"/>
                    <label for="text">Text</label>
                </div>
                <div>
                    <input type="radio" value="image" name="optionType"/>
                    <label for="text">Image</label>
                </div>
                <div>
                    <input type="radio" value="text+image" name="optionType"/>
                    <label for="text">Text + Image</label>
                </div>
            </div>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className={styles.options}>
                <input
                  className={styles.option}
                  type="text"
                  placeholder="Text"
                  name="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  name="imageUrl"
                  value={option.imageUrl}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                />
              </div>
            ))}
            <button onClick={() => addOption(qIndex)}>Add Option</button>
            {qIndex > 0 && (
              <button onClick={() => removeQuestion(qIndex)}>
                Remove Question
              </button>
            )}
          </div>
        ))}
        <div style={{display:'flex' , justifyContent:'space-between'}}>
            <button>Cancel</button>
            <button>Create Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
