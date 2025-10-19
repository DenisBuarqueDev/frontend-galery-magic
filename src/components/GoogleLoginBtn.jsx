// components/GoogleLoginBtn.jsx
import React from 'react';
import { FaGoogle } from "react-icons/fa";

const GoogleLoginBtn = () => {
  const openPopup = () => {
    // abre a rota do backend que inicia o OAuth
    const width = 600, height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      'google-login',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <button onClick={openPopup} className="flex items-center gap-2 justify-center w-full bg-red-500 text-white text-enter p-2 rounded-lg">
      <FaGoogle /> Entrar com Google
    </button>
  );
};

export default GoogleLoginBtn;
