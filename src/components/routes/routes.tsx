 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from '../blog/blog';
import Home from '../home/home';
import ImageGallery from '../image-gallery/image-gallery';


const Navigation = () => {
  return (
    <Routes>
      <Route  path='/' element={<Home />} />
      <Route  path='/home' element={<Home />} />
      <Route  path='/blog' element={<Blog />} />
      <Route path='/image-gallery' element={<ImageGallery />} />
    </Routes>
  );
}

export default Navigation;