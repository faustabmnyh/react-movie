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
  const [selected, setSelected] = useState({});
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
        setSelected(data.episodes[0]);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchMovie();
  }, [fetchURL]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="error">{error}</Message>
  ) : (
    <div className="seasonDetails">
      <img
        src={`${baseURLImage}${selected.still_path}`}
        alt={season.name || season.title}
        className="seasonDetails__main"
      />
      <div className="blur"></div>
      <div className="seasonDetails__details">
        <div className="seasonDetails__about">
          <div className="seasonDetails__header">
            <div className="seasonDetails__headerText">
              <h1>{name}</h1>
              <div className="seasonDetails__subText">{selected.name}</div>
            </div>
            {/* <div className="seasonDetails__love">
              <span>
                <i class="fa fa-heart-o" />
              </span>
            </div> */}
          </div>
          <h3>{season.name}</h3>
          <div className="seasonDetails__info">
            <div>{selected.air_date?.substr(0, 4)}</div>
            <hr />
            <div>Episode {selected.episode_number}</div>
            <hr />
            <div>
              <span>
                <i class="fa fa-star" />
              </span>
              {selected.vote_average} ({selected.vote_count})
            </div>
          </div>
          <p>{selected.overview}</p>
          <button>Play</button>
        </div>
        <ul className="seasonDetails__episodeImg">
          {season.episodes?.map(
            (episode) =>
              episode.still_path && (
                <li key={episode.id}>
                  <img
                    onClick={() => setSelected(episode)}
                    src={`${baseURLImage}${episode.still_path}`}
                    alt={episode.name}
                    className={
                      selected.id === episode.id
                        ? "seasonDetails__img active"
                        : "seasonDetails__img"
                    }
                  />
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default SeasonDetails;
