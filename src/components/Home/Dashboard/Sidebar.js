import React,{useState, useEffect} from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectComponent, setComponent } from "../../../redux/componentSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeComponent = useSelector(selectComponent);

  const handleButtonClick = (buttonName) => {
    dispatch(setComponent(buttonName));
    navigate(`/${buttonName}`);
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
            activeComponent === "dashboard" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === "analytics" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick('analytics')}
        >
          Analytics
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === "createQuiz" ? styles.active : ""
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
