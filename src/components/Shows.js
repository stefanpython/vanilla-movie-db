import "./Shows.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shows({ category }) {
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
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
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
          `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
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
      <h1>{category === "popular" ? "Popular Shows" : "Top Rated Shows"}</h1>
      {category === "popular" ? (
        <div className="popular-container">
          {popular &&
            popular.map((show) => (
              <div key={show.id}>
                <Link className="link" to={`/tv/${show.id}`}>
                  <img
                    className="shows-image"
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.title}
                  />
                  <p>{show.title}</p>

                  <p>{show.vote_average} User Score</p>

                  <p>{show.release_date || show.first_air_date}</p>
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <div className="popular-container">
          {topRated &&
            topRated.map((show) => (
              <div key={show.id}>
                <Link className="link" to={`/tv/${show.id}`}>
                  <img
                    className="shows-image"
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.title}
                  />
                  <p>{show.title}</p>

                  <p>{show.vote_average} User Score</p>

                  <p>{show.release_date || show.first_air_date}</p>
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

export default Shows;
