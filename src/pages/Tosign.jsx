import React, { useState } from "react";

import foto1 from "../assets/layout/Galeria-magica.png";
import foto2 from "../assets/layout/galeria-ingles-portugues.png";
import foto3 from "../assets/layout/jogo-combina-palavras.png";
import foto4 from "../assets/layout/historias-salvas.png";
import foto5 from "../assets/layout/jogo-acerte-palavra.png";
import foto6 from "../assets/layout/jogo-colorir.png";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Chama o backend para criar a preferência
      const response = await fetch(
        "https://backend-galery-magic.onrender.com/api/payments/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar pagamento");
      }

      // Redireciona para o checkout do Mercado Pago
      window.location.href = data.init_point;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col max-w-screen-xl m-auto">
      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
              Histórias Mágicas
            </span>{" "}
            <span className="text-sm font-medium">Inteligência Artificial</span>
            <svg
              className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Desperte a Imaginação e Acelere o Aprendizado do Seu Filho!
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Com Histórias Mágicas IA, as crianças mergulham em um universo de
            imagens mágicas e constroem aventuras personalizadas que estimulam a
            criatividade e o aprendizado bilíngue. Cada clique transforma
            imagens em histórias cativantes e educativas!
          </p>
          <form onSubmit={handlePayment} className="w-full max-w-md mx-auto">
            <label
              for="default-email"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Seu e-Mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="default-email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite seu e-mail aqui."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Comprar
              </button>
            </div>
          </form>

          <div className="mt-10">
            <iframe
              className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
              src="https://www.youtube.com/embed/KaLxCiilHns"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8">
          <h1 className="mb-4 text-4xl text-center font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Uma Jornada Educativa e Encantadora
          </h1>
          <p className="mb-8 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Unimos IA avançada a princípios pedagógicos comprovados para
            oferecer uma experiência imersiva que acelera o desenvolvimento
            cognitivo e linguístico das crianças.
          </p>

          <form onSubmit={handlePayment} className="w-full max-w-md mx-auto">
            <label
              for="default-email"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Seu e-Mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="default-email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite seu e-mail aqui."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Comprar
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-screen-lg m-auto mt-10">
            <div className="w-full bg-white  border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={foto1} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Histórias Personalizadas com IA
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Desperte a criatividade com narrativas exclusivas e
                  personagens que encantam e educam as crianças de forma única.
                </p>
              </div>
            </div>

            <div className="w-full bg-white  border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={foto2} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Áudio Bilíngue Imersivo
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  DAprenda português e inglês de forma natural, ouvindo
                  histórias e palavras em ambos os idiomas para um
                  desenvolvimento linguístico acelerado.
                </p>
              </div>
            </div>

            <div className="w-full bg-white  border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={foto3} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Jogos Educativos Divertidos
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Monte palavras, combine idiomas e transforme o aprendizado em
                  brincadeira interativa que cativa e ensina.
                </p>
              </div>
            </div>

            <div className="w-full bg-white  border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={foto4} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Salve e Reviva Aventuras
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Armazene todas as criações e acesse-as quando quiser,
                  garantindo momentos de diversão infinita.
                </p>
              </div>
            </div>

            <div className="w-full bg-white  border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={foto5} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Domínio Bilíngue Natural
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Desenvolva fluência em português e inglês através de jogos e
                  histórias que tornam o aprendizado irresistivelmente
                  divertido.
                </p>
              </div>
            </div>

            <div className="w-full bg-white border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={foto6} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Imagens para colorir
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Desfrute de 50 imagens para colorir do seu jeito com diversos
                  temas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-8">
          <h1 className="mb-4 text-4xl text-center font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Plano Acessível e Flexível
          </h1>
          <p className="mb-8 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Adiversão perfeita para seu filho com um plano que cabe no seu
            bolso, cancele a qualquer momento sem complicações.
          </p>

          <form onSubmit={handlePayment} className="w-full max-w-md mx-auto">
            <label
              for="default-email"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Seu e-Mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="default-email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite seu e-mail aqui."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Comprar
              </button>
            </div>
          </form>

          <div className="w-full max-w-screen-sm p-4 bg-white border border-gray-200 rounded-lg mt-10 m-auto shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Plano Família
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">R$</span>
              <span className="text-5xl font-extrabold tracking-tight">19,90</span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /Mês
              </span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Crie histórias ilimitadas
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Galeria com 100 personagens
                </span>
              </li>
              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Áudio das histórias criadas
                </span>
              </li>
              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Áudio palavras Português/Inglês
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Salve histórias favoritas
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Biblioteca de sons animais e natureza
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Jogo palavras embaralhadas Português/Inglês
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Jogo combine palavras Português/Inglês
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Jogo adivinhe palavra inglês
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  50 imagens para colorir
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Suporte ao cliente
                </span>
              </li>

              <li className="flex">
                <svg
                  className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Cancele a qualquer momento
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Pronto para Desbloquear o Potencial Ilimitado do Seu Filho?
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Una-se a milhares de famílias que estão revolucionando o aprendizado
            infantil com histórias mágicas, criatividade e bilinguismo.
          </p>
          <form onSubmit={handlePayment} className="w-full max-w-md mx-auto">
            <label
              for="default-email"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Seu e-Mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="default-email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite seu e-mail aqui."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Comprar
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Histórias Mágicas IA™
          </a>
          . Todos os Direitos Reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Sobre Nós
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Política de Privacidade
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licenciamento
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contato
            </a>
          </li>
        </ul>
      </footer>
    </main>
  );
};

export default LandingPage;
