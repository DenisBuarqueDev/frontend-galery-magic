import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaKey } from "react-icons/fa";
import { BiSolidMessageError } from "react-icons/bi";
import { FaWandMagicSparkles } from "react-icons/fa6";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/galery");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao conectar a plataforma!");
    }
  };

  return (
    <main className="flex flex-col items-center px-5 justify-center min-h-screen bg-gray-50 dark:bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <FaWandMagicSparkles className="ml-3 w-8 h-8 text-blue-600" />
            <h5 className="text-3xl font-bold text-center text-blue-700 dark:text-white">
              Histórias Mágicas 
            </h5>
            <p className="text-xl font-semibold text-center text-gray-600 dark:text-white">
              Entre para Ouvir.
            </p>
          </div>
          {error && (
            <div
              class="flex items-center gap-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <BiSolidMessageError className="w-5 h-5" />
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Seu E-Mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sua Senha:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Lembrar senha.
              </label>
            </div>
            <Link
              to="#"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Perdeu a senha?
            </Link>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaKey />
            Entrar na Plataforma
          </button>

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Não tem cadastro?{" "}
            <Link
              to="/"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Criar Conta.
            </Link>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-600"
          >
            <FaGoogle /> Entrar com Google
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Login;
