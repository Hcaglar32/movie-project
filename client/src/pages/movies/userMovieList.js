import React from 'react';

const MovieList = ({ movies, deleteMovieProp }) => {


 
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
                                    <button onClick={event => deleteMovieProp(movie)} className=' flex justify-center mt-5 p-2 bg-red-600 text-white rounded-lg border-2 w-1/2 text-center'>Sil</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            

        </div>
    );
};

export default MovieList;