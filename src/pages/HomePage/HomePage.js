import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Home/Dashboard/Sidebar";
import DashBoard from "../../components/Home/Dashboard/DashBoard";
import Analytics from "../../components/Home/Analytics/Analytics";
import QuizForm from "../../components/Home/CreateQuiz/QuizForm/QuizForm";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [component, setComponent] = useState(
    localStorage.getItem("activeButton") || "dashboard"
  );

  useEffect(() => {
    const storedComponent = localStorage.getItem("component");
    if (storedComponent) {
      setComponent(storedComponent);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "activeButton") {
        setComponent(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  const renderComponent = () => {
    switch (component) {
      case "dashboard":
        return (
          <div className={styles.dashboard}>
            <DashBoard />
          </div>
        );
      case "analytics":
        return <Analytics className={styles.MainContent} />;
      case "createQuiz":
        return (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <QuizForm />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.appContainer}>
        <Sidebar setComponent={setComponent} className={styles.Sidebar} />
      {renderComponent()}
    </div>
  );
};

export default HomePage;
