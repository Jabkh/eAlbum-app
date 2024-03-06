import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_DB_URL } from "../../config/firebaseConfig";
import { postAlbum } from "../../slices/albumsSlice";

const AlbumForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScore, setSelectedScore] = useState(1); // État pour le score sélectionné
  const titleRef = useRef();
  const artistRef = useRef();
  const releaseDateRef = useRef();
  const coverURLRef = useRef();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (token) {
      const newAlbum = {
        title: titleRef.current.value,
        artist: artistRef.current.value,
        releaseDate: releaseDateRef.current.value,
        score: selectedScore, // Utiliser le score sélectionné
        coverURL: coverURLRef.current.value,
      };

      try {
        // const response = await axios.post(`${BASE_DB_URL}albums.json?auth=${token}`, newAlbum);
        // console.log(response.data);
        dispatch(postAlbum(newAlbum));
        resetForm();
        navigate("/albums");
      } catch (error) {
        console.error('Error adding album:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Token is not available");
    }
  }

  const resetForm = () => {
    titleRef.current.value = "";
    artistRef.current.value = "";
    releaseDateRef.current.value = "";
    coverURLRef.current.value = "";
  };

  return ( 
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="albumTitle">
        <Form.Label>Titre</Form.Label>
        <Form.Control type="text" placeholder="Titre" ref={titleRef} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="albumArtist">
        <Form.Label>Artiste</Form.Label>
        <Form.Control type="text" placeholder="Artiste" ref={artistRef} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="albumReleaseDate">
        <Form.Label>Date de sortie</Form.Label>
        <Form.Control type="text" placeholder="Date de sortie" ref={releaseDateRef} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="albumScore">
        <Form.Label>Score</Form.Label>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <Form.Check
              key={value}
              type="radio"
              id={`score-${value}`}
              label={`${value}`}
              checked={selectedScore === value}
              onChange={() => setSelectedScore(value)}
            />
          ))}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="albumCoverURL">
        <Form.Label>URL de la couverture</Form.Label>
        <Form.Control type="text" placeholder="URL de la couverture" ref={coverURLRef} required />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Chargement...' : 'Ajouter'}
      </Button>
    </Form>
   );
}
 
export default AlbumForm;
