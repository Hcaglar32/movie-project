import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ searchMoviePropApi }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    let navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <Box>
                <header className="flex   flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
                    <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                        <div className="flex w-full gap-8 items-center justify-between">
                            <Link to="/" className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white" href="#" style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>
                                <span className='kare '>C</span> Cags Movie
                            </Link>
                            <div className="sm:hidden">
                                <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-image-and-text-1" aria-controls="navbar-image-and-text-1" aria-label="Toggle navigation">
                                    <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                    <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                            {user ?
                                <>
                                    <div className="hidden sm:flex sm:items-center">
                                        <div className="relative">
                                            <form onSubmit={handleSubmit}>
                                                <input onChange={searchMoviePropApi}
                                                    type="text" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ara..." />
                                            </form>
                                        </div>
                                        <div className='text-white'>
                                            <span>{user.username}</span>
                                        </div>
                                        <Button style={{ textDecoration: "none", color: "white" }} onClick={onLogout}>Çıkış Yap</Button>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to="/login" style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>Giriş Yap</Link>
                                    <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Üye Ol</Link>
                                </>
                            }
                        </div>
                    </nav>
                </header>
            </Box>
        </>
    );
}

export default Navbar;
