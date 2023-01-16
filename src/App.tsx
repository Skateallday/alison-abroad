import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
//import Navigation from './components/routes/routes';
import Navigation from './components/routes/routes';
import NavBar from './components/navigation/navbar'
import imageFlair from './components/image-flair/imageflair'
import footer from './components/footer/footer'
import Home from './components/home/home'

function App() {
  return (
    <div className="App">            

        <BrowserRouter>
        <NavBar />

          <Navigation />

        </BrowserRouter>


      <footer >
        {footer()}
      </footer>
    </div>
    
  );
}

export default App; 

