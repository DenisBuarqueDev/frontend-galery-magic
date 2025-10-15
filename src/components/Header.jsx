import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiImageAiFill } from "react-icons/ri";
import { GiMusicalNotes } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Alterna o menu no mobile
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Fecha o menu se redimensionar para modo desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link
          to="/galery"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
        </Link>

        {/* BOTÕES DO TOPO */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={logout}
            type="button"
            className="hidden md:flex items-center focus:ring-4 focus:outline-none font-medium text-sm p-2 text-center rounded-md text-black hover:bg-red-500 hover:text-white"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>

          {/* Botão hamburger (somente mobile) */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Abrir menu principal</span>
            <GiHamburgerMenu className="w-6 h-6" />
          </button>
        </div>

        {/* MENU PRINCIPAL */}
        <div
          id="navbar-sticky"
          className={`${
            isOpen
              ? "flex flex-col items-start w-full animate-fadeIn"
              : "hidden"
          } md:flex md:flex-row md:items-center md:space-x-8 md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row w-full md:w-auto font-medium p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg md:border-0 bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            <li>
              <Link
                to="/galery"
                className="flex items-center py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                <RiImageAiFill className="mr-2" /> Galeria
              </Link>
            </li>
            <li>
              <Link
                to="/story"
                className="flex items-center py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                <GiMusicalNotes className="mr-2 w-4 h-4" /> Histórias
              </Link>
            </li>
            {/*<li>
              <Link
                to="/parents"
                className="flex items-center py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                <FaGear className="mr-2" /> Painel
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                className="flex items-center py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                <LuBaby className="mr-2" /> Baby
              </Link>
            </li>*/}

            {/* Logout no menu mobile */}
            <li className="md:hidden mt-2">
              <button
                onClick={logout}
                className="flex items-center py-2 px-3 w-full text-left text-gray-900 rounded-sm hover:bg-red-500 hover:text-white dark:text-white"
              >
                <FaSignOutAlt className="mr-2" /> Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
