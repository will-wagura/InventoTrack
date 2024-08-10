import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <input type="text" placeholder="Search..." />
      <div className="user-info">
        <img src="src/assets/people.png" alt="Profile" />
        <h5>
  <span className="name">Abdul</span>
  <br/>
  <span className="title">Merchant</span>
</h5>
        
      
      </div>
    </div>
  );
};

export default Header;
