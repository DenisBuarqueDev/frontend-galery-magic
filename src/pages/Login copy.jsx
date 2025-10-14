import React from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Histórias Mágicas IA
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Transforme imaginação em realidade! Com Histórias Mágicas IA, as
              crianças exploram um mundo de imagens e criam suas próprias
              aventuras literárias. Cada toque em uma imagem ganha vida com
              narrativas geradas por inteligência artificial, personalizadas
              para a idade e o gosto do pequeno autor. Estimule a criatividade,
              a leitura e a escrita de forma divertida e interativa.
            </p>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more about our app
            </a>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Entrar na Plataforma
              </h2>
              <form className="mt-8 space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Seu E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sua senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div class="ms-3 text-sm">
                    <label
                      for="remember"
                      className="font-medium text-gray-500 dark:text-gray-400"
                    >
                      Remember this device
                    </label>
                  </div>
                  <a
                    href="#"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sequeci a senha.
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Acessar minha conta
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Não tem registro?{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-500">
                    Crie uma conta.
                  </a>
                </div>

                <button
                  type="button"
                  class="text-white mt-4 bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center w-full inline-flex items-center dark:focus:bg-red-500 me-2 mb-2"
                >
                  <FaGoogle className="mr-2" />
                  Entar com conta Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
