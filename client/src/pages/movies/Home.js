import React, { useEffect, useState, useContext } from "react";
import MovieList from './MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = ({ getMovie, movies, currentUrl, params, setParams }) => {



  useEffect(() => {
    getMovie(currentUrl, params);
  }, []);

  const loadMore = () => {
    let new_params = params;
    new_params.page = params.page + 1;
    setParams(new_params);
    getMovie(currentUrl, params, 1);
  };

  return (
    <div className="container-fluid mx-auto">
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
