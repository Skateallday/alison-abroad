import React  from 'react';
import './styles.css';


function Header() {
  return (
    <div className="header-background">
      <div className="container flex flex-col justify-center p-10">
        <h1 className="text-xxl text-white">Welcome to Alison Abroad</h1>
        <h2 className="text-xl text-white">Capturing the beauty of the world, one photo at a time</h2>
      </div>
    </div>
  );
}

export default Header;
