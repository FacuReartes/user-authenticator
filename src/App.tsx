import "./App.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import UserContextProvider from "./userContext/UserContextProvider";

function App() {

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/home" Component={Home}/>
          <Route path="/login" Component={LogIn}/>
          <Route path="/signup" Component={SignUp}/>
          <Route path="*" element={<Navigate to="/home" replace />}/>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
