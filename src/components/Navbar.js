import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img className="navbar-logo" src="./logo.png" alt="logo" />
        <span className="navbar-title">VMDB</span>
      </div>
      <div className="navbar-middle">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for movie..."
        />
      </div>
      <div className="navbar-right">
        <button>Movies</button>
        <button>TV Shows</button>
      </div>
    </div>
  );
}

export default Navbar;