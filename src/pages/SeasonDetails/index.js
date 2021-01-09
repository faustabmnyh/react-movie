import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import "./SeasonDetails.css";

const baseURLImage = "https://image.tmdb.org/t/p/original/";

const SeasonDetails = () => {
  let { movieId, seasonNumber, name } = useParams();
  const [season, setSeason] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchURL = `https://api.themoviedb.org/3/tv/${movieId}/season/${seasonNumber}?api_key`;

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${fetchURL}=${process.env.REACT_APP_TDMB_API}&with_genres=14`
      );
      try {
        setLoading(false);
        setSeason(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchMovie();
  }, [fetchURL]);
  console.log("asd", season);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="error">{error}</Message>
  ) : (
    <div className="seasonDetails">
      <img
        src={`${baseURLImage}${
          season.episodes && season.episodes[0].still_path
        }`}
        alt={season.name || season.title}
        className="seasonDetails__main"
      />
      <div className="blur"></div>
      <div>
        <ul className="seasonDetails__episodeImg">
          {season.episodes?.map(
            (episode) =>
              episode.still_path && (
                <img
                  src={`${baseURLImage}${episode.still_path}`}
                  alt={episode.name}
                />
              )
          )}
        </ul>
        {/* <div className="seasonDetails__about">
          <div>
            <h1>{season.name || season.title}</h1>
          </div>
          <div className="seasonDetails__info">
            <div>
              {season.release_date?.substr(0, 4) ||
                season.first_air_date?.substr(0, 4)}
            </div>
            <hr />
            <div>
              <ul>
                {season.spoken_languages?.map((s) => (
                  <li key={s.name}>{s.name} </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <span>
                <i class="fa fa-star" />
              </span>
              {season.vote_average} ({season.vote_count})
            </div>
            <hr />
            <div className="seasonDetails__timeTime">
              <span>
                <i class="fa fa-clock-o" />
              </span>
              {season.runtime ||
                (season.episode_run_time && season.episode_run_time[0])}
              m
            </div>
          </div>
          <div className="seasonDetails__genre">
            <span>
              <i class="fa fa-television" />
            </span>
            <ul>
              {season.genres?.map((genre) => (
                <>
                  <li key={genre.id}>{genre.name}</li>
                </>
              ))}
            </ul>
          </div>
          <div className="seasonDetails__tagline">{season.tagline}</div>

          <p>{season.overview}</p>
          <button>
            <a href={season.homepage} target="_blank" rel="noreferrer">
              <span>
                <i class="fa fa-arrow-right" />
              </span>
            </a>
          </button>
          <div className="seasonDetails__production">
            <div>
              Production Companies :
              <ul className="seasonDetails__company">
                {season.production_companies?.map((p, i) =>
                  i === season.production_companies.length - 1 ? (
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
              {season.created_by ? (
                <ul className="seasonDetails__company">
                  {season.created_by?.map((p, i) =>
                    i === season.created_by.length - 1 ? (
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
        </div> */}
      </div>
    </div>
  );
};

export default SeasonDetails;
