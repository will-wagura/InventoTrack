import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>Welcome, Abdul</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-profile">
        <span>Abdul</span>
        <img src="profile-placeholder.jpg" alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
