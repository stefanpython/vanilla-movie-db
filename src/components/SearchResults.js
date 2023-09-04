import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SearchResults() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on the query
    fetchSearchResults(query);
  }, [query]);

  const fetchSearchResults = (query) => {
    // Define options parameter for fetch
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVhMGU2M2QyNjdmMjViMmEyNTk2YmIxMjkwMDk0YSIsInN1YiI6IjY0ZTRjMzc2MDZmOTg0MDBjYTUzNzk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsOzRn0KzJFvoR1SY7EEZTi1oKw6Wry41LZYu5B82N8",
      },
    };

    fetch(`https://api.themoviedb.org/3/search/multi?query=${query}`, options)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  return (
    <div className="popular-container">
      {searchResults &&
        searchResults.map((movie) => (
          <div key={movie.id}>
            <Link className="link" to={`/movie/${movie.id}`}>
              <img
                className="movies-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>

              <p>{movie.vote_average} User Score</p>

              <p>{movie.release_date || movie.first_air_date}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default SearchResults;
