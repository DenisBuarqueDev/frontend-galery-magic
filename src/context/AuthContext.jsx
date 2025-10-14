import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Verifica se há token e usuário salvos
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setLoading(false);
  }, [token]);

  // Função de login com tratamento de erro
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
        error.response?.data?.message || "Falha ao fazer login. Verifique suas credenciais."
      );
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
