import React, { useReducer, createContext } from 'react';
import { jwtDecode } from "jwt-decode";

const initialState = {
    user: null
};

const localUserData = JSON.parse(localStorage.getItem("userData"));


if (localUserData) {
    const token = localUserData.token;
    if (token) {
        try {

            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("userData");
            } else {
                initialState.user = localUserData;
            }
        } catch (error) {
            console.error("Invalid token specified:", error.message);
            localStorage.removeItem("userData"); // Geçersiz tokenı kaldır
        }
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':

            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch({
            type: "LOGIN",
            payload: userData
        });
    };

    function logout() {
        localStorage.removeItem("userData");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };
