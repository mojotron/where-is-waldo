import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Level />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute goto="/admin" condition={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
