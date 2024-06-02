import React from 'react'
import styles from './QuizLink.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QuizLink({quizLink}) {
  const handleShare = () => {
    navigator.clipboard.writeText(quizLink)
    toast.success("link copied succesfully", {
      position: "top-right",
    });
  }
  return (
      <div className={styles.parent}>
        <h1>Congrats Your Quiz is Published</h1>
        <button className={styles.link}>{quizLink}</button>
        <button className={styles.button} onClick={()=>handleShare()}>share</button>
        <ToastContainer autoClose={1000} />
      </div>
  )
}

export default QuizLink