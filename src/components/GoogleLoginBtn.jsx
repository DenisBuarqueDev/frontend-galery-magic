// components/GoogleLoginBtn.jsx
import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginBtn = () => {
  const openPopup = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      "https://backend-galery-magic.onrender.com/api/auth/google",
      "google-login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      // Verifica se a mensagem veio do backend correto
      if (event.origin !== "https://backend-galery-magic.onrender.com") return;

      const { token } = event.data;
      if (token) {
        // Salva token e redireciona
        localStorage.setItem("token", token);
        window.location.href = "/galery";
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <button
      onClick={openPopup}
      className="flex items-center gap-2 justify-center w-full bg-red-500 text-white text-enter p-2 rounded-lg"
    >
      <FaGoogle /> Entrar com Google
    </button>
  );
};

export default GoogleLoginBtn;
