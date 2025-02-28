import { Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Hero from './Hero.jsx';
import Newsinapp from './Newsinapp.jsx';
import News from './News.jsx';

function MainApp() {
  return (
    <>
      <Header />
      <Hero/>
      <Newsinapp/>
      <Footer />
    </>
  );
}

export default MainApp;
