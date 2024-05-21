import React,{useState} from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../redux/componentSlice'


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("dashboard");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    dispatch(setComponent(buttonName));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>QUIZZIE</h1>
      <div className={styles.nav}>
        <button
          className={`${styles.button} ${
            activeButton === "dashboard" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`${styles.button} ${
            activeButton === "analytics" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick('analytics')}
        >
          Analytics
        </button>
        <button
          className={`${styles.button} ${
            activeButton === "createQuiz" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick('createQuiz')}
        >
          Create Quiz
        </button>
      </div>
      <button className={styles.logout} onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Sidebar;
