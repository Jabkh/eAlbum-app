import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate pour la redirection

  const handleLogout = () => {
    dispatch(removeUser());
  };

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Album App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/albums">Albums</Nav.Link>
              <Nav.Link as={Link} to="/add-album">Ajouter un album</Nav.Link>
            </Nav>
            {/* Afficher le bouton de déconnexion uniquement si l'utilisateur est connecté */}
            {token ? (
              <Button variant="secondary" onClick={handleLogout}>Déconnexion</Button>
            ) : (
              <Button variant="primary" onClick={handleLoginRedirect}>Connexion</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
