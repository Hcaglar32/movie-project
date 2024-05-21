import { useState, useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token
        }
    }
`;

function Login(props) {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    });

    const [loginUser] = useMutation(LOGIN_USER, {
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values },
        onCompleted(data) {
            context.login(data.loginUser);
            navigate('/');
        }
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <Container className=" py-10  flex login-page   w-full justify-center items-center h-screen flex-col" spacing={2} maxWidth="sm">
            <h1 className="  text-3xl mb-5">Giriş Yap</h1>
            <Stack className="w-full" spacing={2} paddingBottom={2}>
                <TextField label="Email" name="email" onChange={onChange} />
                <TextField label="Password" name="password" type="password" onChange={onChange} />
            </Stack>
            <div className="login-button w-full">
            <Button variant="contained" onClick={onSubmit}>Giriş Yap</Button>
            </div>
            {errors.map((error, index) => (
                <Alert key={index} severity="error">
                    {error.message}
                </Alert>
            ))}
        </Container>
    );
}

export default Login;
