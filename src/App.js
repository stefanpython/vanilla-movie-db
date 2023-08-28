import "./App.css";
import Trending from "./components/Trending";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import SingleMoviePage from "./components/SingleMoviePage";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/:type/:id" element={<SingleMoviePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
