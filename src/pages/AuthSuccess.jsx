import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Busca dados do usuário logado
      api
        .get("/auth/validate")
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/galery");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg font-semibold text-gray-700 animate-pulse">
        🎉 Autenticando com Google...
      </p>
    </div>
  );
};

export default AuthSuccess;
