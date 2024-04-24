import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import Homepage from './pages/movies/Home';
import Navbar from './components/navbar';
import Register from './pages/register';
import Login from './pages/login';
import axios from "axios";
import qs from "qs";
import { AuthContext } from "./context/authContext";


function App() {

  const { user, logout } = useContext(AuthContext);

  const [params, setParams] = useState({
    'page': 1,
    'language': 'en-US'
  });

  const rated_url = 'https://api.themoviedb.org/3/movie/top_rated';
  const query_url = 'https://api.themoviedb.org/3/search/movie';

  const [movies, setMovies] = useState([]);
  const [currentUrl, setcurrentUrl] = useState(rated_url);


  const getMovie = async (url, param, more = 0) => {
    //console.log('parammsms',param);
    const response = await axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWE3M2MyZGVjYWY5MjQ1MWUzNTQ4OTU3ODYyN2ZjMyIsInN1YiI6IjY1ZWFmNWIyOTRkOGE4MDE3YjhmYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-2a79VjLsPayZuTleeZ0NUjXtWq3JLMIxRi58LoYUNA',
        'accept': 'application/json'
      },
      params: param,
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    });
    if (more) {
      setMovies([...movies, ...response.data.results]);
    } else {
      setMovies(response.data.results);
    }

  };


  const handleSearch = (event) => {
    let new_param;
    let new_currentUrl;
    if (event.target.value !== '') {
      params.query = event.target.value;
      new_param = params;
      new_currentUrl = query_url;
      setcurrentUrl(query_url);
    } else {
      console.log('çalıştım');
      new_param = {
        'page': 1,
        'language': 'en-US'
      }
      new_currentUrl = rated_url;
      setParams(new_param);
      setcurrentUrl(new_currentUrl);
    }
    getMovie(new_currentUrl, new_param);
  };

  return (
    <div>
      <div className="w-full">
        <Navbar searchMoviePropApi={handleSearch} />
      </div>
      <Routes>
        <Route path="/" element={<Homepage getMovie={getMovie} movies={movies} currentUrl={currentUrl} params={params} setParams={setParams}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
