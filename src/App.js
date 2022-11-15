import React from "react";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import the pages
import { Home } from './pages/Home/Home'
import { About } from "./pages/About us/About";
import { Blog } from "./pages/Blog/Blog";
import { Donation } from "./pages/Donate/Donation";
import { Gallery } from "./pages/Gallery/Gallery";
import { Contact } from "./pages/Contact/Contact";
import Article from "./components/Article/Article";
import ErrorPage from "./pages/Others/errorPage";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { Footer } from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.css';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/donate' element={<Donation/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/gallery' element={<Gallery/>} />
          <Route path='/contact' element={<Contact/>} />

          <Route path='/blog/:id' element={<Article/>}/>
          
          {/*Registeration Pages */}
          <Route path='/signup' element={<Register/>} />
          <Route path='/login' element={<Login/>} />

          {/*Others */}
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
