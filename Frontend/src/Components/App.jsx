import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Hero from './Hero.jsx';
import Newsinapp from './Newsinapp.jsx';
import SignUp from './Signup.jsx';
import Login from './Login.jsx';
import MainApp from './MainApp.jsx';
function App() {
  return(
    <>
      

      <Router>
        <Routes>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/MainApp" element={<MainApp />}/> 
        </Routes>
      </Router>
    </>
  );
}

export default App
