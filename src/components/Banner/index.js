import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const baseURLImage = "https://image.tmdb.org/t/p/original/";

const Banner = ({ baseURLImage, truncate }) => {
  const [movie, setMovie] = useState([]);
  const fetchURL = "https://api.themoviedb.org/3/trending/all/week?api_key";
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${fetchURL}=${process.env.REACT_APP_TDMB_API}&language=en-US`
      );
      setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
    }
    fetchData();
  }, [fetchURL]);
  console.log("asdasd", movie);

  return (
    <div className="banner">
      <div className="banner__top">
        <div className="banner__descTop">
          <div>
            <img
              src={`${baseURLImage}${movie.poster_path}`}
              alt={movie.name || movie.title}
              className="banner__imageTop"
            />
          </div>
          <div>
            <Link to={`/movie/${movie.id}/media/${movie.media_type}`}>
              <h3>{movie.title || movie.name}</h3>
            </Link>
            <p>{truncate(movie?.overview, 60)}</p>
          </div>
        </div>
        <div className="banner__action">
          {/* <span className="banner__love">
            <i class="fa fa-heart-o" />
          </span> */}
          <Link to={`/movie/${movie.id}/media/${movie.media_type}`}>
            <span className="banner__chevron">
              <i class="fa fa-chevron-right" />
            </span>
          </Link>
        </div>
      </div>
      <div className="banner__container">
        <div className="banner__description">
          <img
            src={`${baseURLImage}${movie.backdrop_path}`}
            alt={movie.name || movie.title}
            className="banner__image"
          />
          <span>
            <i class="fa fa-play" />
          </span>
        </div>

        <div className="banner__details">
          <ul className="banner__detailsMovie">
            <li>
              <span>
                <i class="fa fa-star" />
              </span>
              <div>{movie.vote_average}</div>
            </li>
            <li>
              <span>
                <i class="fa fa-calendar-o" />
              </span>
              <div>{movie.release_date || movie.first_air_date}</div>
            </li>
            <li>
              <span>
                <i class="fa fa-users" aria-hidden="true"></i>
              </span>
              <div>{movie.popularity}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
