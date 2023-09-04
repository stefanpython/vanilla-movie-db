import "./App.css";
import Trending from "./components/Trending";
import Navbar from "./components/Navbar";
import SingleMoviePage from "./components/SingleMoviePage";
import { HashRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import Shows from "./components/Shows";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/:type/:id" element={<SingleMoviePage />} />
          <Route
            path="/movies/popular"
            element={<Movies category="popular" />}
          />
          <Route
            path="/movies/top-rated"
            element={<Movies category="top-rated" />}
          />

          <Route path="/shows/popular" element={<Shows category="popular" />} />
          <Route
            path="/shows/top-rated"
            element={<Shows category="top-rated" />}
          />

          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </HashRouter>

      {/* Footer */}
      <footer>
        <a href="https://github.com/stefanpython">
          <span>Copyright &copy; 2023 stefanpython </span>
          <img
            className="git-logo"
            src="https://c.tenor.com/A15H8E1VUh8AAAAM/github-cat.gif"
            alt="git icon"
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
