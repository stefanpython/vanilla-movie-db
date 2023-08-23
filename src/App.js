import "./App.css";
import Trending from "./components/Trending";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Welcome />

      <Trending />
    </div>
  );
}

export default App;
