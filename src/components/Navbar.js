import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showTvShowsDropdown, setShowTvShowsDropdown] = useState(false);

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown);
  };

  const toggleTvShowsDropdown = () => {
    setShowTvShowsDropdown(!showTvShowsDropdown);
  };

  return (
    <div className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img className="navbar-logo" src="./logo.png" alt="logo" />
        <span className="navbar-title">VMDB</span>
      </div>
      <div className="navbar-middle">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for movie..."
        />
      </div>
      <div className="navbar-right">
        <div
          className="dropdown left-btn"
          onMouseEnter={toggleMoviesDropdown}
          onMouseLeave={toggleMoviesDropdown}
        >
          <button className="movies-btn">Movies</button>
          {showMoviesDropdown && (
            <div className="dropdown-content">
              <Link to="/movies/popular">
                <button>Popular</button>
              </Link>
              <Link to="/movies/top-rated">
                <button>Top Rated</button>
              </Link>
            </div>
          )}
        </div>
        <div
          className="dropdown right-btn"
          onMouseEnter={toggleTvShowsDropdown}
          onMouseLeave={toggleTvShowsDropdown}
        >
          <button className="shows-btn">TV Shows</button>
          {showTvShowsDropdown && (
            <div className="dropdown-content">
              <button>Popular</button>
              <button>Top Rated</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
