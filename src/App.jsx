import { Routes, Route, Outlet } from "react-router-dom";
import { Navigation } from "./components/Common/Navigation";
import HomePage from "./pages/HomePage";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import BottomNav from "./components/Common/BottomNavigation";
import { AuthProvider } from "./context/AuthContext";
import UserHomePage from "./pages/users/HomePage";
import PrivateRoute from "./context/PrivateRoute";
import AddPrevious from "./pages/users/AddPrevious";
import ShowRecords from "./pages/users/ShowRecords";

function App() {
  return (
    <AuthProvider>
      {/* Navigation should be outside Routes */}
      {/* <Navigation /> */}
      <Routes>
        {/* Common Layout */}
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <BottomNav />
            </>
          }
        >
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />

          {/* User Routes */}
          <Route
            path="user"
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            {/* Separate Pages under /user */}
            <Route index element={<UserHomePage />} /> {/* /user */}
            <Route path="addprevious" element={<AddPrevious />} />
            <Route path="showrecords" element={<ShowRecords />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
