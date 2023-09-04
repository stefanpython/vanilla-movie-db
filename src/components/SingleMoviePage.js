import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleMoviePage.css";

function SingleMoviePage() {
  const [media, setMedia] = useState(null); // Use a single state for both movies and TV shows
  const { id, type } = useParams();
  const [people, setPeople] = useState(null);

  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

  useEffect(() => {
    // Fetch movie or TV show details when the component mounts
    if (type === "tv") {
      fetchMediaDetails("tv", id);
      fetchPeopleDetails("tv", id);
    } else {
      fetchMediaDetails("movie", id);
      fetchPeopleDetails("movie", id);
    }

    // eslint-disable-next-line
  }, [id, type]);

  // Define options parameter for fetch
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // Fetch People
  const fetchPeopleDetails = (mediaType, mediaId) => {
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?language=en-US`,
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
        setPeople(data.cast);
      })
      .catch((err) => {
        console.log(`Error retrieving info:`, err);
      });
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

  const genreNames = media?.genres?.map((genre) => genre.name).join(", ");

  return (
    <div className="singleMovie-container">
      {media ? (
        <div className="singleMovie-content">
          <img
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={media.title || media.name}
          />
          <h2>{media.title || media.name}</h2>

          <p className="tagline">{media.tagline}</p>

          <br />

          <p>{Math.round(media.vote_average)}0% User Score</p>

          <p>Release Date: {media.release_date || media.first_air_date}</p>

          {genreNames && (
            <p>
              Genres: {genreNames}
              {media.runtime &&
                ` - ${Math.floor(media.runtime / 60)}h ${
                  media.runtime % 60
                }min`}
            </p>
          )}

          <hr />

          <div className="overview-container">
            <h3>Overview</h3>

            <div className="overview-text">
              <p className="overview">{media.overview}</p>
            </div>
          </div>

          <h2>Top Billed Cast</h2>

          <div className="crew-container">
            {people &&
              people.slice(0, 10).map((actor, index) => (
                <div className="crew-details" key={index}>
                  <img
                    className="crew-image"
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt="actor"
                  />
                  <p className="actor-name">{actor.name}</p>
                  <p>{actor.character}</p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleMoviePage;
