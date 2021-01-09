import axios from "axios";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
} from "../../constants/movieConstants";
import { useMovieDisptach, useMovieState } from "../../context/movieContext";
import "./MovieDetails.css";

const baseURLImage = "https://image.tmdb.org/t/p/original/";

const MovieDetails = () => {
  let { movieId, media } = useParams();
  const { loading, error, movie } = useMovieState();
  const dispatch = useMovieDisptach();
  const fetchURL = `https://api.themoviedb.org/3/${
    media === "tv" ? "tv" : "movie"
  }/${movieId}?api_key`;
  const fetchMovie = useRef(() => {});
  fetchMovie.current = async () => {
    dispatch({ type: MOVIE_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${fetchURL}=${process.env.REACT_APP_TDMB_API}&with_genres=14`
    );
    try {
      dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: MOVIE_DETAILS_FAIL,
        payload: err.message,
      });
    }
  };
  useEffect(() => {
    fetchMovie.current();
  }, []);
  console.log(movie);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="error">{error}</Message>
  ) : (
    <div className="movieDetails">
      <img
        src={`${baseURLImage}${movie.backdrop_path}`}
        alt={movie.name || movie.title}
        className="movieDetails__main"
      />
      <div className="blur"></div>
      <div className={"movieDetails__details"}>
        {media === "tv" && (
          <ul className="movieDetails__season">
            {media === "tv" &&
              movie.seasons?.map((season) => (
                <li>
                  <Link
                    to={`/movie/${movie.id}/season/${season.season_number}/name/${movie.name}`}
                  >
                    <img
                      src={`${baseURLImage}${season.poster_path}`}
                      alt={season.name}
                      className="movieDetails__seasonImg"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        )}
        <div className="movieDetails__about">
          <div className="movieDetails__header">
            <div>
              <h1>{movie.name || movie.title}</h1>
            </div>
            {/* <div className="movieDetails__love">
              <span>
                <i class="fa fa-heart-o" />
              </span>
            </div> */}
          </div>
          <div className="movieDetails__tagline">{movie.tagline}</div>
          <div className="movieDetails__info">
            <div>
              {movie.release_date?.substr(0, 4) ||
                movie.first_air_date?.substr(0, 4)}
            </div>
            <hr />
            <div>
              <ul>
                {movie.spoken_languages?.map((s) => (
                  <li key={s.name}>{s.name} </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <span>
                <i class="fa fa-star" />
              </span>
              {movie.vote_average} ({movie.vote_count})
            </div>
            <hr />
            <div className="movieDetails__timeTime">
              <span>
                <i class="fa fa-clock-o" />
              </span>
              {movie.runtime ||
                (movie.episode_run_time && movie.episode_run_time[0])}
              m
            </div>
          </div>
          <div className="movieDetails__genre">
            {/* <span>
              <i class="fa fa-television" />
            </span> */}
            <ul>
              {movie.genres?.map((genre) => (
                <>
                  <li key={genre.id}>{genre.name}</li>
                </>
              ))}
            </ul>
          </div>

          <p>{movie.overview}</p>
          <button>
            <a href={movie.homepage} target="_blank" rel="noreferrer">
              {media === "tv" ? "See TV" : "See Movie"}
              <span>
                <i class="fa fa-arrow-right" />
              </span>
            </a>
          </button>
          <div className="movieDetails__production">
            <div>
              Production Companies :
              <ul className="movieDetails__company">
                {movie.production_companies?.map((p, i) =>
                  i === movie.production_companies.length - 1 ? (
                    <li key={p.id}>
                      <h3>{p.name}.</h3>
                    </li>
                  ) : (
                    <li key={p.id}>
                      <h3>{p.name},</h3>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              Director :
              {movie.created_by && movie.created_by > 0 ? (
                <ul className="movieDetails__company">
                  {movie.created_by?.map((p, i) =>
                    i === movie.created_by.length - 1 ? (
                      <li key={p.id}>
                        <h3>{p.name}.</h3>
                      </li>
                    ) : (
                      <li key={p.id}>
                        <h3>{p.name},</h3>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                " -"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
