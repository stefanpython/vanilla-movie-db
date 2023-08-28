import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleMoviePage.css";

function SingleMoviePage() {
  const [media, setMedia] = useState(null); // Use a single state for both movies and TV shows
  const { id, type } = useParams();

  useEffect(() => {
    // Fetch movie or TV show details when the component mounts
    if (type === "movie") {
      fetchMediaDetails("movie", id);
    } else if (type === "tv") {
      fetchMediaDetails("tv", id);
    }
  }, [id, type]);

  // Define options parameter for fetch
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWVhMGU2M2QyNjdmMjViMmEyNTk2YmIxMjkwMDk0YSIsInN1YiI6IjY0ZTRjMzc2MDZmOTg0MDBjYTUzNzk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsOzRn0KzJFvoR1SY7EEZTi1oKw6Wry41LZYu5B82N8",
    },
  };

  // Fetch movie or TV show details based on type
  const fetchMediaDetails = (mediaType, mediaId) => {
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`,
      options
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Response failed");
        }
      })
      .then((data) => {
        setMedia(data);
      })
      .catch((err) => {
        console.log(`Error retrieving ${mediaType} info:`, err);
      });
  };

  return (
    <div className="singleMovie-container">
      {media && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={media.title || media.name}
          />
          <h2>{media.title || media.name}</h2>
          <p>Release Date: {media.release_date || media.first_air_date}</p>
        </div>
      )}
    </div>
  );
}

export default SingleMoviePage;
