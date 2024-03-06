import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from './slices/authSlice';
import AppRouter from './router';

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Appeler l'action de déconnexion lors du clic sur le bouton de déconnexion
    dispatch(removeUser());
  };

  return (
    <>
      {user && <button onClick={handleLogout}>Déconnexion</button>}
      <AppRouter />
    </>
  );
}

export default App;