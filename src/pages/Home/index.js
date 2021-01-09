import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
} from "../../constants/movieConstants";
import { useMovieDisptach, useMovieState } from "../../context/movieContext";
import "./Home.css";

const baseURLImage = "https://image.tmdb.org/t/p/original/";

const Home = () => {
  const dispatch = useMovieDisptach();
  const { loading, error, movies } = useMovieState();
  const fetchURL = "https://api.themoviedb.org/3/discover/movie?api_key";
  const fetchMovies = useRef(() => {});
  fetchMovies.current = async () => {
    dispatch({ type: MOVIE_LIST_REQUEST });
    const { data } = await axios.get(
      `${fetchURL}=${process.env.REACT_APP_TDMB_API}&with_genres=14`
    );
    try {
      dispatch({ type: MOVIE_LIST_SUCCESS, payload: data.results });
      localStorage.setItem("movies", JSON.stringify(data.results));
    } catch (err) {
      dispatch({
        type: MOVIE_LIST_FAIL,
        payload: err.message,
      });
    }
  };
  useEffect(() => {
    fetchMovies.current();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="error">{error}</Message>
  ) : (
    <div>
      <Banner
        fetchURL={fetchURL}
        baseURLImage={baseURLImage}
        truncate={truncate}
      />
      <div className="home__row">
        {movies.map((movie) => (
          <div className="home__rowContainer" key={movie.id}>
            <div className="home__rowContent">
              <Link to={`/movie/${movie.id}}`}>
                <img
                  alt={movie.name || movie.title}
                  src={`${baseURLImage}${movie.poster_path}`}
                />
              </Link>
              <div className="home__rowText">
                {truncate(movie?.overview, 200)}
              </div>
            </div>
            <div className="home__footer">
              <div className="home__footerTitle">
                <Link to={`/movie/${movie.id}}`}>
                  <h3>{movie.name || movie.title}</h3>
                </Link>
                {/* <span>
                  <i class="fa fa-heart-o" />
                </span> */}
              </div>
              <div className="home__footerDate">
                {movie.release_date.substr(0, 4) || movie.first_air_date}
              </div>
              <div className="home__rowRating">
                <span>
                  <i class="fa fa-star" />
                </span>
                <div className="home__ratingCount">
                  {movie.vote_average} ({movie.vote_count})
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
