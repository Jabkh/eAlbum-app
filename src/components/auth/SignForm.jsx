import { useDispatch, useSelector } from "react-redux";
import { setAuthMode, setUser } from "../../slices/authSlice";
import { useRef } from "react";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../config/firebaseConfig";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';

const SignForm = () => {
    const authMode = useSelector(state => state.auth.authMode);
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const credentials = {
            email,
            password,
            returnSecureToken: true
        };

        const URL = authMode === "Se connecter" ? SIGN_IN_URL : SIGN_UP_URL;

        axios.post(URL, credentials).then(response => {
            localStorage.setItem("token", response.data.idToken);
            dispatch(setUser(response.data));
            dispatch(setAuthMode(""));
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
