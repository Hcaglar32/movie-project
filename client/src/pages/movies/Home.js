import React, { useEffect, useState, useContext } from "react";
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from "axios";
import qs from "qs";
import InfiniteScroll from 'react-infinite-scroll-component';
import { AuthContext } from "../../context/authContext";
const Home = () => {
  const { user, logout } = useContext(AuthContext);
  
  const rated_url = 'https://api.themoviedb.org/3/movie/top_rated';
  const query_url = 'https://api.themoviedb.org/3/search/movie';


  const [movies, setMovies] = useState([]);
  const [currentUrl, setcurrentUrl] = useState(rated_url);
  const [params, setParams] = useState({
    'page': 1,
    'language': 'en-US'
  });

  useEffect(() => {
    getMovie(currentUrl, params);
  }, []);

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
      console.log('nana')
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

  const loadMore = () => {
    let new_params = params;
    new_params.page = params.page + 1;
    setParams(new_params);
    getMovie(currentUrl, params, 1);
  };

  return (
    <div className="container-fluid mx-auto">
      <div className="w-full">
        <SearchBar searchMoviePropApi={handleSearch} />
      </div>
      <InfiniteScroll dataLength={movies.length} next={loadMore} hasMore={true} endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Hepsini Görüntüledin... Tebrikler!</b>
        </p>
      } loader={<h4>Yükleniyor...</h4>}>
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
};

export default Home;
