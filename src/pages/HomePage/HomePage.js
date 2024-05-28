import Sidebar from "../../components/Home/Dashboard/Sidebar";
import DashBoard from "../../components/Home/Dashboard/DashBoard";
import Analytics from "../../components/Home/Analytics/Analytics";
import QuizForm from "../../components/Home/CreateQuiz/QuizForm/QuizForm";
import styles from "./HomePage.module.css";
import { useSelector} from 'react-redux';
import { selectComponent } from "../../redux/componentSlice";


const HomePage = () => {
  const activeComponent = useSelector(selectComponent);

  const renderComponent = () => {
    switch (activeComponent) {
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
        <Sidebar className={styles.Sidebar} />
      {renderComponent()}
    </div>
  );
};

export default HomePage;
