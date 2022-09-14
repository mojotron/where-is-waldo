import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// context
import { useAuthContext } from "./hooks/useAuthContext";
// pages
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
// components
import Navbar from "./components/Navbar";
import Level from "./pages/Level/Level";
import Footer from "./components/Footer";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level/:id" element={<Level />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute goto="/admin" condition={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
