import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Navbar';
import AlbumList from './components/albums/AlbumList'; 
import AlbumForm from './components/albums/AlbumForm'; 
import SignForm from './components/auth/SignForm';

const AppRouter = () => {
  const token = localStorage.getItem("token");

  const renderProtectedRoute = (element) => {
    return token ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={renderProtectedRoute(<Layout><AlbumList /></Layout>)} />
        <Route path="/login" element={<Layout><SignForm /></Layout>} />
        <Route path="/albums" element={renderProtectedRoute(<Layout><AlbumList /></Layout>)} />
        <Route path="/add-album" element={renderProtectedRoute(<Layout><AlbumForm /></Layout>)} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
