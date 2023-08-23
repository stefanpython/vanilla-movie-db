import "./Trending.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trending() {
  const [trending, setTrending] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);

  useEffect(() => {
    fetchTrending();
    fetchTvSeries();
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

  // FETCH LATEST MOVIES
  const fetchTrending = () => {
    // Fetch more pages at once using promise.all
    const totalPages = 3;
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${page}`,
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
        setTrending(combinedResults);
      })
      .catch((err) => console.error(err));
  };

  // FETCH LATEST TV SHOWS
  const fetchTvSeries = () => {
    // Fetch more pages at once using promise.all
    const totalPages = 3;
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=${page}`,
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
        setTvSeries(combinedResults);
      })
      .catch((err) => console.error(err));
  };

  // Settings for the react-slick carousel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show at a time
    slidesToScroll: 4, // Number of slides to scroll on each change
  };

  return (
    <>
      <div className="trending-container">
        <h1>Movies trending this week</h1>
        <Slider {...settings}>
          {trending.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="shows-container">
        <h1>TV Shows trending this week</h1>
        <Slider {...settings}>
          {tvSeries.map((show) => (
            <div key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.title}
              />
              <p>{show.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Trending;
