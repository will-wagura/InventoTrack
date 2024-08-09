import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <input type="text" placeholder="Search..." />
      <div className="user-info">
        <img src="src/assets/people.png" alt="Profile" />
        <span>Jack Doe</span>
        <span>Merchant</span>
      </div>
    </div>
  );
};

export default Header;
