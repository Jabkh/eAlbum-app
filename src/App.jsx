import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppRouter from './router';

function App() {
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Appeler l'action de déconnexion lors du clic sur le bouton de déconnexion
    dispatch(removeUser());
  };

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;