import "./Movies.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movies({ category }) {
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

  useEffect(() => {
    if (category === "popular") {
      fetchPopular();
    } else {
      fetchTopRated();
    }
    // eslint-disable-next-line
  }, [totalPages, popular, topRated]);

  // Define opitons parameter for fetch
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const fetchPopular = () => {
    // Fetch more pages at once using promise.all
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          options
        )
          .then((response) => response.json())
          .then((data) => data.results)
      );
    }

    // Use Promise.all to wait for all requests to complete
    Promise.all(requests)
      .then((results) => {
        // Combine the results from all pages into a single array
        const combinedResults = results.flat();
        setPopular(combinedResults);
      })
      .catch((err) => console.error(err));
  };

  const fetchTopRated = () => {
    // Fetch more pages at once using promise.all
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
          options
        )
          .then((response) => response.json())
          .then((data) => data.results)
      );
    }

    Promise.all(requests)
      .then((results) => {
        // Combine results from all pages into a single array
        const combinedResults = results.flat();
        setTopRated(combinedResults);
      })
      .catch((err) => console.error(err));
  };

  const handleLoadMore = () => {
    setTotalPages((prevTotalPages) => prevTotalPages + 1);
  };

  return (
    <div>
      <h1>{category === "popular" ? "Popular Movies" : "Top Rated Movies"}</h1>
      {category === "popular" ? (
        <div className="popular-container">
          {popular &&
            popular.map((movie) => (
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
      ) : (
        <div className="popular-container">
          {topRated &&
            topRated.map((movie) => (
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
      )}
      <button onClick={handleLoadMore} className="loadmore-btn">
        Load more
      </button>
    </div>
  );
}

export default Movies;
