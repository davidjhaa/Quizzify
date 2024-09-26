import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignupPage/SignUpPage";
import LoginPage from "./pages/Loginpage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import QuizDetails from "./components/Quiz/Quiz/Quiz";
import EditQuiz from "./components/Home/CreateQuiz/QuizQuestions/EditQuiz";
import QuizResult from "./components/Quiz/QuizResult/QuizResult";
import QuizLink from "./components/Home/CreateQuiz/QuizLink/QuizLink";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={HomePage} />} /> 
        <Route path="/analytics" element={<HomePage />}/>  
        <Route path="/createQuiz" element={<HomePage />}/>  
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/quiz/link" element={<QuizLink />} />
        <Route path="/quiz/updateQuiz" element={<ProtectedRoute Component={EditQuiz} />}/>

        {/* Wildcard route for undefined paths */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
