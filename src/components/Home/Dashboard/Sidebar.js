import React,{useState, useEffect} from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";


const Sidebar = ({setComponent }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("activeButton") || "dashboard"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveButton(localStorage.getItem('activeButton') || 'dashboard');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); 

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    localStorage.setItem("activeButton", buttonName);
    setComponent(buttonName);
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
