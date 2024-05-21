import React, { useState } from 'react';
import './Test.css';

const QuizCreator = () => {
  const [questions, setQuestions] = useState([{ text: '', options: [{ text: '', imageUrl: '' }] }]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ text: '', imageUrl: '' }] }]);
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
    newQuestions[qIndex].options[oIndex][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: '', imageUrl: '' });
    setQuestions(newQuestions);
  };

  return (
    <div className="quiz-creator">
      <div className="question-nav">
        {questions.map((_, index) => (
          <div key={index} className="question-circle">{index + 1}</div>
        ))}
        <button onClick={addQuestion}>+</button>
      </div>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question">
          <input
            type="text"
            placeholder="Poll Question"
            value={question.text}
            onChange={(e) => handleQuestionChange(qIndex, e)}
          />
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="option">
              <input
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
          {qIndex > 0 && <button onClick={() => removeQuestion(qIndex)}>Remove Question</button>}
        </div>
      ))}
      <button>Create Quiz</button>
    </div>
  );
};

export default QuizCreator;