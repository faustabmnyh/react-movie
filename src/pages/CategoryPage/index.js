import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const baseURLImage = "https://image.tmdb.org/t/p/original/";

const CategoryPage = () => {
  let { category } = useParams();
  const [categoryLists, setCategoryLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchURL = `https://api.themoviedb.org/3/discover/${category}?api_key`;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${fetchURL}=${process.env.REACT_APP_TDMB_API}`
      );
      try {
        setLoading(false);
        setCategoryLists(data.results);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [fetchURL, category]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  function truncateTitle(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  console.log(categoryLists);

  return (
    <div>
      <div className="searchPage__row">
        {categoryLists.map(
          (list) =>
            list.poster_path && (
              <div className="searchPage__rowContainer" key={list.id}>
                <div className="searchPage__rowContent">
                  <Link to={`/movie/${list.id}/media/${category}`}>
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
                    <Link to={`/movie/${list.id}/media/${category}`}>
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

export default CategoryPage;
