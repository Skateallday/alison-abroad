import React  from 'react';
import './styles.css';


function Header() {
  return (
    <div className="header-background">      
    <div className="screen">  
        <div className="screen-image"></div> 
        <div className="screen-content">
            <div className="screen-user">
                <span className="name" data-value="WelcomeTo">Welcome to</span>
                <span className="name" data-value="AlisonAbroad"><h1>Alison Abroad</h1></span>
            </div>
        </div>
      </div>      
    </div>
    
  );
}

export default Header;
