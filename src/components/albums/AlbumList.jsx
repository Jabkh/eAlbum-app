import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import AlbumItem from "./AlbumItem";
import { BASE_DB_URL } from "../../config/firebaseConfig";
import { useSelector, useDispatch } from 'react-redux';
import { resetChangeFlag } from '../../slices/albumsSlice';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('title'); // Critère de tri par défaut : titre
  const hasChanged = useSelector(state => state.albums.hasChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`${BASE_DB_URL}albums.json`);
        const data = response.data;
        if (data) {
          const fetchedAlbums = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAlbums(fetchedAlbums);
        }
        dispatch(resetChangeFlag());
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, [hasChanged, dispatch]);

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction de tri des albums en fonction du critère sélectionné
  const sortAlbums = (criteria) => {
    switch (criteria) {
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
  const sortedAlbums = sortAlbums(sortCriteria);

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
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
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
