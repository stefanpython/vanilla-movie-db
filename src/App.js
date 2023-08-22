import "./App.css";
import Trending from "./components/Trending";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <h1>Vanilla Movie DB</h1>

      <Trending />
    </div>
  );
}

export default App;
