 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from '../blog/blog';
import Home from '../home/home';
import ImageGallery from '../image-gallery/image-gallery';
import EditImage from "../image-gallery/edit-image";
import CreateImage from "../image-gallery/create-image";
import CreateUser from "../users/create-users";
import Login from "../login/login";
import Register from '../login/reg';


const Navigation = () => {
  return (
    <Routes>
      <Route  path='/' element={<Home />} />
      <Route  path='/home' element={<Home />} />
      <Route  path='/blog' element={<Blog />} />
      <Route path='/image-gallery' element={<ImageGallery />} />
      <Route path="/edit/:id" element={<EditImage/>} />
      <Route path="/create-image" element={<CreateImage/>} />
      <Route path="/create-user" element={<CreateUser/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}

export default Navigation;