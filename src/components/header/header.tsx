import React  from 'react';
import './styles.css';


function Header() {
  return (
    <div className="header-background">      
    <div className="screen">  
        <div className="screen-image"></div> 
        <div className="screen-content">
            <div className="screen-user">
                <span className="name" data-value="AlisonAbroad"><h1 className='text-xxl'>Welcome to Alison Abroad</h1></span>
                <span><h2>Capturing the beauty of the world, one photo at a time</h2></span>
                
            </div>
        </div>
      </div>      
    </div>
    
  );
}

export default Header;
