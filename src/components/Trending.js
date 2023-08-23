import "./Trending.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVhMGU2M2QyNjdmMjViMmEyNTk2YmIxMjkwMDk0YSIsInN1YiI6IjY0ZTRjMzc2MDZmOTg0MDBjYTUzNzk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsOzRn0KzJFvoR1SY7EEZTi1oKw6Wry41LZYu5B82N8",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((data) => setTrending(data.results))
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
    <div className="trending-container">
      <h1>Trending this week</h1>
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
  );
}

export default Trending;
