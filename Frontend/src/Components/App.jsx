import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Hero from './Hero.jsx';
import Newsinapp from './Newsinapp.jsx';
import SignUp from './Signup.jsx';
import Login from './Login.jsx';
import MainApp from './MainApp.jsx';
import News from './News.jsx';
import About from './About.jsx';
import Profile from './Profile.jsx';
import AdminNews from './AdminNews.jsx';
import Admin from './Admin.jsx';

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/" element={<Login/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<MainApp/>}/> 
          <Route path="/News" element={<News/>}/> 
          <Route path="/About" element={<About/>}/> 
          <Route path="/Profile" element={<Profile/>}/> 
          <Route path="/AdminNews" element={<AdminNews/>}/> 
          <Route path="/Admin" element={<Admin/>}/> 
        </Routes>
      </Router>
    </>
  );
}

export default App
