// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// App.tsx
// App.tsx

import React from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import './App.module.css';


import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <TopBar />
        <MainContent />
       
      </div>
      <RightSidebar />

    </div>
    <Footer />
    </div>
  );
};

export default App;