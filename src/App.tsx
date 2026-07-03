import React, { useState } from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom'
//import Navigation from './components/routes/routes';
import Navigation from './components/routes/routes';
import NavBar from './components/navigation/navbar'
import AdminNavBar from './components/navigation/admin-nav';
import footer from './components/footer/footer'



function App() {

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("jwtToken") !== null
  )


  return (
    <div className="App">            

        <BrowserRouter>
        {isAuth ? <AdminNavBar onLogout={() => setIsAuth(false)} /> : <NavBar/>}
        

          <Navigation />

        </BrowserRouter>


      <footer >
        {footer()}
      </footer>
    </div>
    
  );
}

export default App; 

