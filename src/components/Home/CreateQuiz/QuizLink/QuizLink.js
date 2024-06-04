import React from 'react'
import { useDispatch } from "react-redux";
import { setComponent } from "../../../../redux/componentSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './QuizLink.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImCross } from "react-icons/im";

function QuizLink() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { quizLink, quizType } = location.state;
  
  const handleShare = () => {
    navigator.clipboard.writeText(quizLink)
    toast.success("link copied succesfully", {
      position: "top-right",
    });
  }

  const handleCancel = () => {
    dispatch(setComponent('dashboard'))
    navigate('/dashboard')
  }

  return (
    <div className={styles.main}>
      <div className={styles.parent}>
        <h1>Congrats! Your {quizType === 'Q&A' ? 'Quiz' : 'Poll'} is Published</h1>
        <button className={styles.link}>{quizLink}</button>
        <button className={styles.button} onClick={()=>handleShare()}>share</button>
        <ImCross className={styles.closeButton} onClick={()=> handleCancel()}/>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  )
}

export default QuizLink