import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_DB_URL } from "../../config/firebaseConfig";
import { updateAlbum, deleteAlbum, resetChangeFlag } from "../../slices/albumsSlice";

const AlbumItem = ({ album }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedScore, setSelectedScore] = useState(album.score);
    const titleRef = useRef();
    const artistRef = useRef();
    const releaseDateRef = useRef();
    const coverURLRef = useRef();

    const token = localStorage.getItem("token"); // Obtenir le token du stockage local

    const updateAlbumHandler = async () => {
        // Vérifier si le token est disponible
        if (!token) {
            console.error("Token is not available");
            return;
        }

        const updatedAlbum = {
            id: album.id,
            title: titleRef.current.value,
            artist: artistRef.current.value,
            releaseDate: releaseDateRef.current.value,
            score: selectedScore,
            coverURL: coverURLRef.current.value,
        };

        try {
            await axios.put(`${BASE_DB_URL}albums/${album.id}.json?auth=${token}`, updatedAlbum);
            dispatch(updateAlbum(updatedAlbum));
            dispatch(resetChangeFlag());
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };

    const deleteAlbumHandler = async () => {
        // Vérifier si le token est disponible
        if (!token) {
            console.error("Token is not available");
            return;
        }

        try {
            await axios.delete(`${BASE_DB_URL}albums/${album.id}.json?auth=${token}`);
            dispatch(deleteAlbum(album.id));
            dispatch(resetChangeFlag());
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={album.coverURL} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                {isEditing ? (
                    <Form>
                        <Form.Group className="mb-3" controlId="formAlbumTitle">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control type="text" ref={titleRef} defaultValue={album.title} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAlbumArtist">
                            <Form.Label>Artiste</Form.Label>
                            <Form.Control type="text" ref={artistRef} defaultValue={album.artist} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAlbumReleaseDate">
                            <Form.Label>Date de sortie</Form.Label>
                            <Form.Control type="text" ref={releaseDateRef} defaultValue={album.releaseDate} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAlbumScore">
                            <Form.Label>Score</Form.Label>
                            <div>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Form.Check
                                        key={value}
                                        type="radio"
                                        id={`score-${value}`}
                                        label={`${value} étoile${value > 1 ? 's' : ''}`}
                                        checked={selectedScore === value}
                                        onChange={() => setSelectedScore(value)}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAlbumCoverURL">
                            <Form.Label>URL de la couverture</Form.Label>
                            <Form.Control type="text" ref={coverURLRef} defaultValue={album.coverURL} />
                        </Form.Group>
                        <Button variant="success" onClick={updateAlbumHandler} disabled={!token}>Valider</Button>
                        <Button variant="danger" onClick={() => setIsEditing(false)} disabled={!token}>Annuler</Button>
                    </Form>
                ) : (
                    <>
                        <Card.Title>{album.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{album.artist}</Card.Subtitle>
                        <Card.Text>
                            Sortie : {album.releaseDate}<br />
                            Score : {album.score}
                        </Card.Text>
                        {token && ( // Condition pour afficher les boutons si le token est disponible
                            <>
                                <Button variant="warning" onClick={() => setIsEditing(true)}>Modifier</Button>{' '}
                                <Button variant="danger" onClick={deleteAlbumHandler}>Supprimer</Button>
                            </>
                        )}
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default AlbumItem;
