import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PollQuizAnalytics from "./QuizAnalytics/PollQuizAnalytics/PollQuizAnalytics";
import QAQuizAnalytics from "./QuizAnalytics/Q&A_QuizAnalyttics/Q&A_QuizAnalytics";
import axios from "axios";
import styles from "./Analytics.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { HiShare } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditQuiz from "../CreateQuiz/QuizQuestions/EditQuiz"
const apiUrl = process.env.REACT_APP_Backend_URL;


function Analytics() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [quiztype, setQuiztype] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const notify = () => {
    toast.success("Quiz Link Copied", {
      position: "top-right",
    });
  };

  const getQuizzes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/quiz/analytics`);
      if (response.status === 200) {
        setQuizzes(response.data.quiz);
      }
    } catch (error) {
      console.log("something went wrong, cant fetch analytics of quiz");
    }
  };

  const handleQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuiztype(quiz.quizType);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setCurrentQuiz(null);
    setQuiztype(null);
  };

  const handleShare = (quiz) => {
    const link = `${window.location.origin}/quiz/${quiz._id}`;
    navigator.clipboard.writeText(link);
    notify();
  };

  const handleDelete = (quiz) => {
    setQuizToDelete(quiz);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      console.log(quizToDelete._id);
      const response = await axios.post(
        `${apiUrl}/quiz/deleteQuiz/${quizToDelete._id}`
      );
      if (response.status === 200) {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((q) => q._id !== quizToDelete._id)
        );
        setShowDeleteConfirmation(false);
        setQuizToDelete(null);
      }
    } catch (error) {
      console.log("Failed to delete the quiz");
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setQuizToDelete(null);
  };

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setShowEdit(true);
  }

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className={styles.main}>
      {showOverlay && (
        <div className={styles.overlay}>
          {quiztype === "Poll" && (
            <PollQuizAnalytics
              quiz={currentQuiz}
              onClose={handleCloseOverlay}
            />
          )}
          {quiztype === "Q&A" && (
            <QAQuizAnalytics quiz={currentQuiz} onClose={handleCloseOverlay} />
          )}
        </div>
      )}
      {showDeleteConfirmation && (
        <div className={styles.deleteConfirmation}>
          <div className={styles.confirmationBox}>
            <p style={{ marginBottom: "20px", fontSize: "32px" }}>
              Are you confirm, you want to delete ?
            </p>
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: "red", color: "white", width: '150px' }}
            >
              Confirm Delete
            </button>
            <button
              onClick={cancelDelete}
              style={{
                width: '150px',
                backgroundColor: "white",
                color: "black",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showEdit && (
        <EditQuiz quiz={currentQuiz} quizType={quiztype} setShowEdit={setShowEdit} />
      )}
      <div className={styles.analyticsContainer}>
        <div className={styles.title}>Analytics</div>

        {quizzes.length > 0 &&
          quizzes.map((quiz, index) => {
            const dateObj = new Date(quiz.createdAt);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const backgroundColor =
              index % 2 === 0 ? "white" : "rgb(195, 198, 240)";
            return (
              <div
                key={index}
                className={styles.quizItem}
                style={{ backgroundColor }}
              >
                <div className={styles.quizItemContent}>{index + 1}</div>
                <div className={styles.quizItemContent}>{quiz.quizName}</div>
                <div className={styles.quizItemContent}>{formattedDate}</div>
                <div className={styles.quizItemContent} style={{display:'flex', justifyContent:'center'}}>{quiz.totalViews}</div>
                <div className={styles.quizItemContent}
                  style={{ display: "flex", justifyContent:'center', gap: "8px" }}>
                  <FaRegEdit
                    size={20}
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleEditQuiz(quiz)}
                  />
                  <MdDeleteOutline
                    size={22}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(quiz)}
                  />
                  <HiShare
                    size={20}
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => handleShare(quiz)}
                  />
                </div>
                <div className={styles.link} onClick={() => handleQuiz(quiz)}>
                  Question wise Analysis
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default Analytics;




