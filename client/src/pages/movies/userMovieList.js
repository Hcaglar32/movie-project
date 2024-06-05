import React, { useState, useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import qs from "qs";

const GET_FAVORITE_MOVIE = gql`
  query getFavoriteMovies($userId: String!) {
    getFavoriteMovies( userId: $userId ) {
      favoriteMovies
    }
  }
`;

const UserMovieList = () => {
  let navigate = useNavigate();
  const { user, decodedToken, logout } = useContext(AuthContext);
  const [userMovies, setUserMovies] = useState([]);

  const [params, setParams] = useState({
    'page': 1,
    'language': 'en-US'
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { data, loading, error } = useQuery(GET_FAVORITE_MOVIE, {
    variables: { userId: decodedToken ? decodedToken.user_id : "" },
  });

  useEffect(() => {
    if (data && data.getFavoriteMovies && Array.isArray(data.getFavoriteMovies.favoriteMovies)) {
      let favorites = data.getFavoriteMovies.favoriteMovies;
      let moviesPromises = favorites.map(async (favorit) => {
        try {
          const response = await axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.themoviedb.org/3/movie/' + favorit,
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWE3M2MyZGVjYWY5MjQ1MWUzNTQ4OTU3ODYyN2ZjMyIsInN1YiI6IjY1ZWFmNWIyOTRkOGE4MDE3YjhmYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2a79VjLsPayZuTleeZ0NUjXtWq3JLMIxRi58LoYUNA',
              'accept': 'application/json'
            },
            params: params,
            paramsSerializer: params => {
              return qs.stringify(params)
            }
          });
          console.log('response', response.data);
          return response.data; // Axios isteğinden gelen veriyi döndür
        } catch (error) {
          console.error('Error fetching movie:', error);
          return null; // Hata durumunda null döndür
        }
      });

      // Tüm film isteklerinin tamamlanmasını bekleyen Promise'lar dizisi
      Promise.all(moviesPromises)
        .then((moviesData) => {
          // Tüm film detaylarını alındığında setUserMovies ile state'i güncelle
          setUserMovies(moviesData.filter(movie => movie !== null)); // null olmayanları filtrele
        })
        .catch(error => console.error('Error fetching movies:', error));
    }
  }, [data]);

  return (
    <div className="container mx-auto mt-10 py-8">
      <div className="flex justify-between flex-wrap">
        {userMovies.map((userMovie, index) => (
          <div className="movie-card mb-8 w-1/2 flex" key={index}>
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
