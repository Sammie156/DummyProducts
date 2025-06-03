import "../styles/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <h2>{props.title}</h2>
      <div>
        <input
          type="text"
          value={props.val}
          className="search-bar"
          placeholder="Search"
          onChange={props.onChange}
          size="30"
        />
        <button
          type="button"
          className="cross-button"
          onClick={() => {
            const input = document.querySelector(".search-bar");
            input.value = "";
          }}
        >
          X
          </button>
      </div>
    </div>
  );
}

export default Navbar;
