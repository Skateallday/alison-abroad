 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from '../blog/blog';
import Home from '../home/home'


const Navigation = () => {
  return (
    <Routes>
      <Route  path='/' element={<Home />} />
      <Route  path='/home' element={<Home />} />
      <Route  path='/blog' element={<Blog />} />
    </Routes>
  );
}

export default Navigation;