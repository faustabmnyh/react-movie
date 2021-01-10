import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import "./SearchPage.css";

const baseURLImage = "https://image.tmdb.org/t/p/original/";

const SearchPage = () => {
  let { searchName } = useParams();
  const [searchLists, setSearchLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchURL = "https://api.themoviedb.org/3/search/multi?api_key";
  const fetchURLNO = "https://api.themoviedb.org/3/discover/movie?api_key";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const { data } = await axios.get(
        searchName === "all"
          ? `${fetchURLNO}=${process.env.REACT_APP_TDMB_API}&with_genres=27`
          : `${fetchURL}=${process.env.REACT_APP_TDMB_API}&page=1&query=${searchName}`
      );
      try {
        setLoading(false);
        setSearchLists(data.results);
        localStorage.setItem("searchList", JSON.stringify(data.results));
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchMovies();
  }, [fetchURL, searchName]);

  console.log("asd", searchLists);
  console.log("asdads", searchName);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  function truncateTitle(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="error">{error}</Message>
  ) : searchLists.length === 0 ? (
    <div className="searchPage__notFound">
      <h1>Movie or TV Show Not Found</h1>
      <h3>Your Keyword {searchName}</h3>
    </div>
  ) : (
    <div>
      <div className="searchPage__row">
        {searchLists.map(
          (list) =>
            list.poster_path && (
              <div className="searchPage__rowContainer" key={list.id}>
                <div className="searchPage__rowContent">
                  <Link
                    to={
                      list.media_type
                        ? `/movie/${list.id}/media/${list.media_type}`
                        : `/movie/${list.id}`
                    }
                  >
                    <img
                      alt={list.name || list.title}
                      src={`${baseURLImage}${list.poster_path}`}
                    />
                  </Link>
                  <div className="searchPage__rowText">
                    {truncate(list?.overview, 200)}
                  </div>
                </div>
                <div className="searchPage__footer">
                  <div className="searchPage__footerTitle">
                    <Link
                      to={
                        list.media_type
                          ? `/movie/${list.id}/media/${list.media_type}`
                          : `/movie/${list.id}`
                      }
                    >
                      <h3>
                        {truncateTitle(list.name, 30) ||
                          truncateTitle(list.title, 40)}
                      </h3>
                    </Link>
                  </div>
                  <div className="searchPage__footerDate">
                    {list.release_date?.substr(0, 4) ||
                      list.first_air_date?.substr(0, 4)}
                  </div>
                  <div className="searchPage__rowRating">
                    <span>
                      <i class="fa fa-star" />
                    </span>
                    <div className="searchPage__ratingCount">
                      {list.vote_average} ({list.vote_count})
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
