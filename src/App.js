import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

const UserContext = createContext();

const App = () => {
  const [admin, setAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin setAdmin={setAdmin} />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute user={admin}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
