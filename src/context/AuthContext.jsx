import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  //  Verifica se o token e o usuário são válidos
  useEffect(() => {
    const checkAuth = async () => {
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verifica se o token ainda é válido (rota do backend para validar token)
          const res = await api.get("/auth/validate");

          // Se a API confirmar, restaura o usuário
          if (res.status === 200) {
            setUser(JSON.parse(userData));
          } else {
            handleLogout();
          }
        } catch (error) {
          console.warn("Sessão expirada ou inválida:", error);
          handleLogout();
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Função de login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: jwt, user: userData } = res.data;

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(jwt);
      setUser(userData);
      api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error(
        error.response?.data?.message ||
          "Falha ao fazer login. Verifique suas credenciais."
      );
    }
  };

  // Logout seguro (também usado para expiração de sessão)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout: handleLogout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
