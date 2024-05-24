import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignupPage/SignUpPage";
import LoginPage from "./pages/Loginpage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import QuizDetails from "./components/Quiz/Quiz";
import QuizResult from "./components/QuizResult/QuizResult";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute Component= {HomePage} />} /> 
        <Route path="/analytics" element={<ProtectedRoute Component={HomePage} />}/>  
        <Route path="/createQuiz" element={<ProtectedRoute Component={HomePage} />}/>  
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/quiz/result" element={<QuizResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
