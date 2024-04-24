import { useState, useContext } from "react";
import { AuthContext } from '../context/authContext';
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks"

import { TextField, Button, Container, Stack, Alert } from "@mui/material";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";


const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput:RegisterInput
    ){
        registerUser(
            registerInput:$registerInput
        ){
            email,
            username
            token
        }
    }
`

function Register(props) {
    const context = useContext(AuthContext)
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confrimPassword: ''
    });

    function registerUserCallback() {
        console.log("callback hit");
        registerUser();
    }

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values }
    });

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Register</h3>
            <p>Burası Kayıt Sayfası</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Username"
                    name="username"
                    onChange={onChange}
                />
                <TextField
                    label="Email"
                    name="email" 
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
                <TextField
                    label="Confrim Password"
                    name="confrimPassword"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(function(error){
                return(
                    <Alert severity="error">
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant="contained" onClick={onSubmit}>Üye Ol</Button>
        </Container>
    )
}

export default Register;
