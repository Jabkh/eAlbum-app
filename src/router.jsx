// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AlbumList from './components/albums/AlbumList'; 
import AlbumForm from './components/albums/AlbumForm'; 
import SignForm from './components/auth/SignForm';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><SignForm /></Layout>} /> {/* Route pour afficher la liste des albums */}
        <Route path="/login" element={<Layout><SignForm /></Layout>} />
        <Route path="/albums" element={<Layout><AlbumList /></Layout>} /> {/* Route pour ajouter un album */}
        <Route path="/add-album" element={<Layout><AlbumForm /></Layout>} /> {/* Route pour ajouter un album */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
