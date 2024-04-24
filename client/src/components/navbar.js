import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    let navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogut = () => {
        logout();
        navigate('/');
    }
    console.log(user);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant='h5' component="div">
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>React Login</Link>
                    </Typography>
                    <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
                        {user ?
                            <>
                            <Button style={{ textDecoration: "none", color: "white" }} onClick={onLogut}>Logout</Button>
                            </>

                            :
                            <>
                                <Link to="/login" style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>Login</Link>
                                <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register</Link>
                            </>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
