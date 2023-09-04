import "./Trending.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Welcome from "./Welcome";

function Trending() {
  const [trending, setTrending] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

  useEffect(() => {
    fetchTrending();
    fetchTvSeries();
    fetchUpcoming();
    // eslint-disable-next-line
  }, []);

  // Define opitons parameter for fetch
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // FETCH LATEST MOVIES
  const fetchTrending = () => {
    // Fetch more pages at once using promise.all
    const totalPages = 4;
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // FETCH LATEST TV SHOWS
  const fetchTvSeries = () => {
    // Fetch more pages at once using promise.all
    const totalPages = 4;
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  //FETCH POPULATE MOVIES AND TV SHOWS
  const fetchUpcoming = () => {
    const totalPages = 4;
    const requests = [];

    // fetch popular movies
    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
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
        setUpcoming(combinedResults);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Settings for the react-slick carousel
  const settings = {
    cssEase: "linear",
    infinite: true,
    speed: 250,
    slidesToShow: 4, // Number of slides to show at a time
    slidesToScroll: 4, // Number of slides to scroll on each change
  };

  // Check if loading, and display a loading indicator if so
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Welcome />

      <div className="trending-container">
        <h1>Movies trending this week</h1>
        <Slider {...settings}>
          {trending.map((movie) => (
            <div key={movie.id}>
              <Link to={`/${movie.media_type}/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className="shows-container">
        <h1>TV Shows trending this week</h1>
        <Slider {...settings}>
          {tvSeries.map((show) => (
            <div key={show.id}>
              <Link to={`/${show.media_type}/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.title}
                />
                <p>{show.name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className="upcoming-container">
        <h1>Upcoming movies</h1>
        <Slider {...settings}>
          {upcoming.map((movie) => (
            <div key={movie.id}>
              <Link to={`/${movie.media_type}/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Trending;
