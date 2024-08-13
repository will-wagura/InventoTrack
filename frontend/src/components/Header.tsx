// import React from 'react';

// interface HeaderProps {
//   toggleTheme: () => void;
//   theme: string;
// }

// const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
//   return (
//     <div className="header">
//       <input type="text" placeholder="Search..." className="search-input" />
//       <div className="user-info">
//         <img src="src/assets/people.png" alt="Profile" className="profile-img" />
//         <h5>
//           <span className="name">Abdul</span>
//           <br />
//           <span className="title">Merchant</span>
//         </h5>
//       </div>
//       <button onClick={toggleTheme} className="theme-toggle">
//         Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
//       </button>
//     </div>
//   );
// };

// export default Header;


import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <input type="text" placeholder="Search..." />
     
    </div>
  );
};

export default Header;

