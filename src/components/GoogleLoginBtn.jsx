import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginBtn = () => {
  const openPopup = () => {
    const width = 600, height = 700;
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
      const allowedOrigins = [
        "https://backend-galery-magic.onrender.com",
        "http://localhost:5000"
      ];
      if (!allowedOrigins.includes(event.origin)) return;

      const { token } = event.data;
      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/galery"; // redireciona após login
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
