import { useDispatch, useSelector } from "react-redux";
import { setAuthMode } from "../../slices/authSlice";
import { useRef, useEffect } from "react"; // Import de useEffect
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from "../../slices/authSlice";

const SignForm = () => {
    const authMode = useSelector(state => state.auth.authMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Vérifier si un jeton est déjà présent

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        // Vérifier si un jeton est déjà présent et rediriger vers /albums
        if (token) {
            navigate("/albums");
        }
    }, []); // Utilisation de useEffect avec une dépendance vide pour simuler le montage du composant

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Dispatch de l'action authenticateUser avec les informations d'authentification
        dispatch(authenticateUser({ email, password, authMode })).then(() => {
            navigate("/albums"); // Redirection vers "/albums" après authentification réussie
        });
    };

    return ( 
        <>
            <h3>{authMode}</h3>
            <hr />
            <Form onSubmit={submitFormHandler} className="my-4">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {authMode}
                </Button>
            </Form>
            <Button 
                onClick={() => dispatch(setAuthMode(authMode === "Se connecter" ? "S'inscrire" : "Se connecter"))}>
                    {authMode === "Se connecter" ? "S'inscrire" : "Se connecter"}
            </Button>
        </>
     );
}
 
export default SignForm;
