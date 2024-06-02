import React from 'react'
import styles from './PollQuizAnalytics.module.css'
import { ImCross } from "react-icons/im";


function PollQuizAnalytics({quiz, onClose}) {
  return (
    <div className={styles.main}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1>{quiz.quizName} Question Analysis</h1>
            <ImCross style={{color:'red', cursor:'pointer'}} onClick={onClose}/>
      </div>
        {quiz.questions.map((question, index) => (
            <div>
                <h2>Q.{question.questionNumber} {question.questionText}</h2>
                <div style={{display:'flex'}}>
                    {question.options.map((option, idx)=> (
                        <div className={styles.option}>{option.count} option{idx+1}</div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}

export default PollQuizAnalytics