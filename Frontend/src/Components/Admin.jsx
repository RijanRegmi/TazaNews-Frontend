import { Routes, Route } from "react-router-dom";
import Footer from './Footer.jsx';
import Hero from './Hero.jsx';
import Newsinapp from './Newsinapp.jsx';
import News from './News.jsx';
import HeaderAdmin from './HeaderAdmin.jsx';
function MainApp() {
  return (
    <>
      <HeaderAdmin />
      <Hero/>
      <Newsinapp/>
      <Footer />
    </>
  );
}

export default MainApp;
