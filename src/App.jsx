import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext"; // 👈 import do novo Context
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import English from "./pages/English";
import Perfil from "./pages/Perfil";
import Parents from "./pages/Parents";
import Story from "./pages/Story";
import WordGame from "./pages/WordGame";
import WordMatchGame from "./pages/WordMatchGame";
import Tosign from "./pages/Tosign";
import WordGuees from "./pages/WordGuees";

function App() {
  const location = useLocation();
  const hiddenRoutes = ["/", "/assinar"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {/* 👇 Envolvemos toda a aplicação com ProductsProvider */}
      <ProductsProvider>
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route
            path="/english"
            element={
              <ProtectedRoute>
                <English />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wordgame/:id/:linguage"
            element={
              <ProtectedRoute>
                <WordGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wordcombine"
            element={
              <ProtectedRoute>
                <WordMatchGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wordguees"
            element={
              <ProtectedRoute>
                <WordGuees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assinar"
            element={
              <ProtectedRoute>
                <Tosign />
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
