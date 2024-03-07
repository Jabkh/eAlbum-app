import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import AlbumItem from "./AlbumItem";
import { useSelector, useDispatch } from 'react-redux';
import { resetChangeFlag, fetchAlbums } from '../../slices/albumsSlice'; // Import de fetchAlbums

const AlbumList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [triParCritere, setTriParCritere] = useState('title'); // Critère de tri par défaut : titre
  const hasChanged = useSelector(state => state.albums.hasChanged);
  const albums = useSelector(state => state.albums.albums); // Utilisation de la liste d'albums depuis le store
  const dispatch = useDispatch();

  useEffect(() => {
    // Appel de fetchAlbums au lieu de faire la requête directement
    dispatch(fetchAlbums());
  }, [hasChanged, dispatch]);

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction de tri des albums en fonction du critère sélectionné
  const sortAlbums = (critere) => {
    switch (critere) {
      case 'title':
        return [...filteredAlbums].sort((a, b) => a.title.localeCompare(b.title));
      case 'score':
        return [...filteredAlbums].sort((a, b) => a.score - b.score);
      // Ajoutez d'autres cas pour trier par d'autres critères comme la date de sortie
      default:
        return filteredAlbums;
    }
  };

  // Appel de la fonction de tri pour obtenir les albums triés
  const sortedAlbums = sortAlbums(triParCritere);

  return (
    <Container>
      <Form.Control
        type="text"
        placeholder="Rechercher un album"
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      {/* Ajout d'un select pour choisir le critère de tri */}
      <Form.Select
        value={triParCritere}
        onChange={(e) => setTriParCritere(e.target.value)}
        className="mb-3"
      >
        <option value="title">Titre</option>
        <option value="score">Score</option>
        {/* Ajoutez d'autres options pour d'autres critères de tri */}
      </Form.Select>
      <Row xs={1} md={2} lg={4} className="g-4">
        {sortedAlbums.map((album) => (
          <Col key={album.id}>
            <AlbumItem album={album} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AlbumList;
