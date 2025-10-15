import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Perfil from "./pages/Perfil";
import Parents from "./pages/Parents";
import Story from "./pages/Story";
import Signature from "./pages/Signature";

function App() {

  const location = useLocation();
  const hiddenRoutes = ["/", "/assinatura"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <div>
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/assinatura" element={<Signature />} />
          <Route
            path="/galery"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parents"
            element={
              <ProtectedRoute>
                <Parents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/story"
            element={
              <ProtectedRoute>
                <Story />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
