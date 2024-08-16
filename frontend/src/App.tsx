import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import { RootState } from './redux/store';
import { loginSuccess } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute';
import ManageUsers from './pages/Merchant/ManageUsers';
import ManageStorePage from './pages/Merchant/ManageStorePage';
import Order from './pages/Merchant/Order';
import Products from './pages/Merchant/Products';
import Settings from './pages/Merchant/Settings';
import Statistic from './pages/Merchant/Statistic';
import ClerkDashboard from './pages/Clerk/ClerkDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SuperuserDashboard from './pages/SuperuserDashboard';
import LoginForm from './components/LoginForm';
import Home from './pages/Merchant/Home';
import SupplyRequest from './components/SupplyRequests'
import StockInformation from './components/StockInformation';
const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      dispatch(loginSuccess(storedUser));
    }
  }, [dispatch]);

  const getDashboardRoute = (role: string | undefined) => {
    switch (role) {
      case 'clerk':
        return <ClerkDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'superadmin':
        return <Home />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <div style={{ flex: 1 }}>
          {isAuthenticated && <Header />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated
                  ? getDashboardRoute(userRole)
                  : <Navigate to="/login" />
              }
            />
            <Route
              path="/manage-store"
              element={<PrivateRoute element={<ManageStorePage />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/manage-users"
              element={<PrivateRoute element={<ManageUsers />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/order"
              element={<PrivateRoute element={<Order />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/products"
              element={<PrivateRoute element={<Products />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/supply-requests"
              element={<SupplyRequest />} />
            <Route
              path="/products"
              element={<PrivateRoute element={<Products />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/settings"
              element={<PrivateRoute element={<Settings />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/statistic"
              element={<PrivateRoute element={<Statistic />} isAuthenticated={isAuthenticated} />}
            />
            <Route path="/stock-information" element={<StockInformation />} />
            <Route path="/merchant-dashboard" element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
            <Route path="/clerk-dashboard" element={<PrivateRoute element={<ClerkDashboard />} isAuthenticated={isAuthenticated} />} />
            <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} isAuthenticated={isAuthenticated} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/superuser-dashboard' element={<SuperuserDashboard />} />
          </Routes>
          {isAuthenticated && <Footer />}
        </div>
      </div>
    </Router>
  );
};

export default App;
