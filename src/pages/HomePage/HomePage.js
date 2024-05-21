import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Home/Dashboard/Sidebar';
import DashBoard from '../../components/Home/Dashboard/DashBoard';
import CreateQuiz from '../../components/Home/CreateQuiz/CreateQuiz';
import { selectComponentClicked } from '../../redux/componentSlice';
import styles from './HomePage.module.css';

const HomePage = () => {
  const componentName = useSelector(selectComponentClicked);
 
  const renderComponent = () => {
    switch (componentName.component) {
      case 'dashboard':
        return <DashBoard className={styles.MainContent} />;
      case 'createQuiz':
        return <CreateQuiz className={styles.MainContent} />;
        case 'analytics':
          return <CreateQuiz className={styles.MainContent} />;
      default:
        return null;
    }
  };


  return (
    <div className={styles.appContainer}>
      <Sidebar className={styles.Sidebar}/>
      {renderComponent()}
    </div>
  );
};
export default HomePage;

