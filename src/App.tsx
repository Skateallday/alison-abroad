import React from 'react';
import './App.css';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
//import Navigation from './components/routes/routes';
import Navigation from './components/routes/routes';
import NavBar from './components/navigation/navbar'
import AdminNavBar from './components/navigation/admin-nav';
import footer from './components/footer/footer'



function App() {


  return (
    <div className="App">            

        <BrowserRouter>
        <AdminNavBar />
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

