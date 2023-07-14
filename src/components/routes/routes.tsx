 import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../home/home';
import ImageGallery from '../image-gallery/image-gallery';
import EditImage from "../image-gallery/edit-image";
import CreateImage from "../image-gallery/create-image";
import CreateUser from "../users/create-users";
import Login from "../login/login";
import Register from '../login/reg';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // Get the token from local storage
  const token = localStorage.getItem('jwtToken');

  // Check if the token exists
  return token !== null;}
  const ProtectedRoute: React.FC<{ element: React.ReactNode, path: string }> = ({ element, path }) => {
    if (isAuthenticated()) {
      return <>{element}</>; // Render the protected component directly
    } else {
      return <Navigate to="/login" />;
    }
  };
  
  const Navigation = () => {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/image-gallery' element={<ImageGallery />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<EditImage />} path="/edit/:id" />} />
        <Route path="/create-image" element={<ProtectedRoute element={<CreateImage />} path="/create-image" />} />
        <Route path="/create-user" element={<ProtectedRoute element={<CreateUser />} path="/create-user" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
  
  export default Navigation;