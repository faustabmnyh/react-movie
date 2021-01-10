import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  const [searchName, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setShow(true);
      } else {
        setShow(false);
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchName.trim() === "" ? "all" : searchName}`);
  };

  const handleCategory = (c) => {
    setCategory(c);
    history.push(`/category/${c}`);
  };
  return (
    <header>
      <div className={show ? "header popup" : "header"}>
        <div>
          <ul className="header__nav">
            <li>
              <Link to="/" onClick={() => setCategory("")}>
                <h1>MgMovie</h1>
              </Link>
            </li>
            <li
              onClick={() => handleCategory("movie")}
              className={category === "movie" && "active"}
            >
              Movie
            </li>
            <li
              onClick={() => handleCategory("tv")}
              className={category === "tv" && "active"}
            >
              Tv Show
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="header__form">
          <input
            type="text"
            value={searchName}
            placeholder="Search..."
            onChange={(e) => setSearchName(e.target.value)}
            className="header__input"
          />
          <div className="header__btn" onClick={handleSubmit}>
            <span>
              <i class="fa fa-search" />
            </span>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
