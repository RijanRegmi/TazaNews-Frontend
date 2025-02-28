import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profilepic from "./../assets/TazaNews.png";
import "bootstrap/dist/css/bootstrap.css";
import './../Style/About.css';
import TazaNews from './../assets/TazaNews.png';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

function Profile() {
  const navigate = useNavigate();

  return (
    <>
        <Header/>

        <Footer/>
    </>
  );
}

export default Profile;
