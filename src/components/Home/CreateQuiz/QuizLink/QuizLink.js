import React from 'react'
import styles from './QuizLink.module.css'

function QuizLink({quizLink}) {
  return (
      <div className={styles.parent}>
        <h1>Quiz created successfully</h1>
        <button>{quizLink}</button>
      </div>
  )
}

export default QuizLink