import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-overlay">
        <div className="welcome-text">
          <h1>Welcome to Vanilla Movie Database</h1>
          <h2>
            Millions of movies, TV shows, and much more to discover. Explore
            now.
          </h2>
        </div>
      </div>
      <img className="welcome-image" src="./welcome1.jpg" alt="theatre" />
    </div>
  );
}

export default Welcome;
