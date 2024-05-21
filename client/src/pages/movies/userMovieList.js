import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserMovieList = () => {
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const response = await axios.get('/client/userMovies');
        setUserMovies(response.data);
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    fetchUserMovies();
  }, []);

  const deleteUserMovie = async (userMovie) => {
    try {
      await axios.delete(`/api/userMovies/${userMovie._id}`);
      setUserMovies(userMovies.filter(movie => movie._id !== userMovie._id));
    } catch (error) {
      console.error('Error deleting user movie:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 py-8">
      <div className="flex justify-between flex-wrap">
        {userMovies.map((userMovie) => (
          <div className="movie-card mb-8 w-1/2 flex" key={userMovie._id}>
            <div className="flex items-center mr-8 space-x-4 bg-white rounded-lg shadow-md p-5">
              <div className="img-area w-1/4">
                <img
                  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${userMovie.poster_path}`}
                  alt="Film Poster"
                  className="w-40 ml-2 h-auto rounded-lg"
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <div className="contents">
                  <h2 className="text-lg font-semibold">{userMovie.title}</h2>
                  <p className="text-gray-500">IMDB: {userMovie.vote_average}</p>
                  <p>{userMovie.overview}</p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => deleteUserMovie(userMovie)}
                    className="flex justify-center mt-5 p-2 bg-red-600 text-white rounded-lg border-2 w-1/2 text-center"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMovieList;
