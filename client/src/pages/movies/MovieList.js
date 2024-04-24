import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';

const MovieList = ({ movies, getMovie }) => {

    const adduserMovie = async (movieData) => {
        try {
            const newMovie = new movies(movieData);
            await newMovie.save();
            console.log('Movie added to database:', newMovie);
        } catch (error) {
            console.error('Error adding movie to database:', error);
        }
    };

    const [userMovies, setUserMovies] = useState([]);

    useEffect(() => {
        const fetchUserMovies = async () => {
            try {
                const response = await axios.get('/api/userMovies');
                setUserMovies(response.data);
            } catch (error) {
                console.error('Error fetching user movies:', error);
            }
        };

        fetchUserMovies();
    }, []);

    return (
        <div className="container mx-auto mt-10 py-8">
            <div className="flex justify-between flex-wrap">
                {movies.map((movie) => (
                    <div className="movie-card mb-8 w-1/2 flex" key={movie.id}>
                        <div className="flex items-center mr-8 space-x-4 bg-white rounded-lg shadow-md p-5">
                            <div className="img-area w-1/4">
                                <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="Film Poster" className="w-40 ml-2 h-auto rounded-lg" />
                            </div>
                            <div className="flex w-1/2 flex-col">
                                <div className="contents">
                                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                                    <p className="text-gray-500">IMDB: {movie.vote_average}</p>
                                    <p>{movie.overview}</p>
                                </div>
                                <div className='flex'>
                                    <button onClick={event => adduserMovie(movie)} className=' flex justify-center mt-5 p-2  bg-blue-400 text-white rounded-lg border-2 w-1/2 text-center'>Ekle</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;