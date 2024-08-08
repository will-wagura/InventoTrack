
// import React from 'react';
// import Sidebar from './components/Sidebar';
// import TopBar from './components/TopBar';
// import MainContent from './components/MainContent';
// import RightSidebar from './components/RightSidebar';
// import Footer from './components/Footer';
// import './App.module.css';


// import styles from './App.module.css';

// const App: React.FC = () => {
//   return (
//     <div className={styles.container}>
//     <div className={styles.app}>
//       <Sidebar />
//       <div className={styles.mainContainer}>
//         <TopBar />
//         <MainContent />
       
//       </div>
//       <RightSidebar />

//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import AddAdminForm from './components/AddAdminForm';
import ManageAdmins from './components/ManageAdmins';
import styles from './App.module.css';

const App: React.FC = () => {
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showManageAdmins, setShowManageAdmins] = useState(false);

  const handleAddAdmin = () => {
    setShowAddAdmin(true);
    setShowManageAdmins(false);
  };

  const handleManageAdmins = () => {
    setShowManageAdmins(true);
    setShowAddAdmin(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.mainContainer}>
          <TopBar onAddAdmin={handleAddAdmin} onManageAdmins={handleManageAdmins} />
          <MainContent>
            {showAddAdmin && <AddAdminForm />}
            {showManageAdmins && <ManageAdmins />}
            {/* Other main content goes here */}
          </MainContent>
        </div>
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
};

export default App;