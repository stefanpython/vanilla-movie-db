import "./Movies.css";
import { useEffect, useState } from "react";

function Movies({ category }) {
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);

  useEffect(() => {
    fetchPopular();
    // eslint-disable-next-line
  }, []);

  // Define opitons parameter for fetch
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVhMGU2M2QyNjdmMjViMmEyNTk2YmIxMjkwMDk0YSIsInN1YiI6IjY0ZTRjMzc2MDZmOTg0MDBjYTUzNzk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsOzRn0KzJFvoR1SY7EEZTi1oKw6Wry41LZYu5B82N8",
    },
  };

  const fetchPopular = () => {
    // Fetch more pages at once using promise.all
    const totalPages = 1;
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

  console.log(popular);

  return (
    <div>
      <h1>{category === "popular" ? "Popular Movies" : "Top Rated Movies"}</h1>
      <div className="popular-container">
        {popular.map((movie) => (
          <div key={movie.id}>
            <img
              className="movies-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>

            <p>{movie.vote_average} User Score</p>

            <p>{movie.release_date || movie.first_air_date}</p>
          </div>
        ))}
      </div>
      <button className="loadmore-btn">Load more</button>
    </div>
  );
}

export default Movies;
