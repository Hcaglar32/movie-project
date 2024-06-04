import React from 'react';
import { useMutation, gql } from '@apollo/client';
import axios from 'axios';

const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavoriteMovie($movieId: String!) {
  addFavoriteMovie(movieInput: { movieId: $movieId }) {
    username
    email
    favoriteMovies
  }
}

`;

const MovieList = ({ movies, getMovie }) => {
    const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE);

    const adduserMovie = async (movie) => {
        try {
            const response = await addFavoriteMovie({
                variables: { movieId: movie.id }
            });
            console.log('Movie added to database:', response.data);
        } catch (error) {
            console.error('Error adding movie to database:', error);
        }
    };

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
                                    <button onClick={() => adduserMovie(movie)} className=' flex justify-center mt-5 p-2 bg-blue-400 text-white rounded-lg border-2 w-1/2 text-center'>Ekle</button>
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
