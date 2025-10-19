// pages/AuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      // Exemplo rápido: guardar em localStorage (substituir por cookie HttpOnly se usar)
      localStorage.setItem('token', token);
      // redireciona para a home do app
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Autenticando...</div>;
};

export default AuthSuccess;
