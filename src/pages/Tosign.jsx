import React from "react";
import { MdAutoStories } from "react-icons/md";
import { MdSpatialAudioOff } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { AiFillSound } from "react-icons/ai";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { IoIosSave } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";

const LandingPage = () => {
  return (
    <main className="flex flex-col max-w-screen-xl m-auto">
      <section className="dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-amber-700 bg-amber-100 rounded-full dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800"
          >
            <span className="text-xs bg-amber-600 rounded-full text-white px-4 py-1.5 me-3">
              Histórias com
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Desperte a Imaginação e Acelere o Aprendizado do Seu Filho com IA!
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
            Com Histórias Mágicas IA, as crianças mergulham em um universo de
            imagens mágicas e constroem aventuras personalizadas que estimulam a
            criatividade e o aprendizado bilíngue. Cada clique transforma
            imagens em histórias cativantes e educativas!
          </p>

          <div className="mb-10">
            <iframe
              className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
              src="https://www.youtube.com/embed/KaLxCiilHns"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900"
            >
              Transforme o Futuro do Seu Filho
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Assine Agora!
            </a>
          </div>
        </div>
      </section>

      <section className=" dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Uma Jornada Educativa e Encantadora
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Unimos IA avançada a princípios pedagógicos comprovados para
            oferecer uma experiência imersiva que acelera o desenvolvimento
            cognitivo e linguístico das crianças.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <div className="max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <MdAutoStories className="w-16 h-16 text-amber-500 dark:text-gray-400 mb-3 m-auto" />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-amber-800 dark:text-white">
                Histórias Personalizadas com IA
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Desperte a criatividade com narrativas exclusivas e personagens
              que encantam e educam as crianças de forma única.
            </p>
          </div>

          <div className="max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <MdSpatialAudioOff className="w-16 h-16 text-amber-500 dark:text-gray-400 mb-3 m-auto" />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-amber-800 dark:text-white">
                Áudio Bilíngue Imersivo
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Aprenda português e inglês de forma natural, ouvindo histórias e
              palavras em ambos os idiomas para um desenvolvimento linguístico
              acelerado.
            </p>
          </div>
          <div className="max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <IoGameController className="w-16 h-16 text-amber-500 dark:text-gray-400 mb-3 m-auto" />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-amber-800 dark:text-white">
                Jogos Educativos Divertidos
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Monte palavras, combine idiomas e transforme o aprendizado em
              brincadeira interativa que cativa e ensina.
            </p>
          </div>

          <div className="max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <AiFillSound className="w-16 h-16 text-amber-500 dark:text-gray-400 mb-3 m-auto" />

            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-amber-800 dark:text-white">
                Sons Realistas e Imersivos
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Descubra sons autênticos de animais, natureza e ambientes que
              enriquecem as histórias e estimulam os sentidos.
            </p>
          </div>

          <div className="max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <IoIosSave className="w-16 h-16 text-amber-500 dark:text-gray-400 mb-3 m-auto" />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-amber-800 dark:text-white">
                Salve e Reviva Aventuras
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Armazene todas as criações e acesse-as quando quiser, garantindo
              momentos de diversão infinita.
            </p>
          </div>

          <div className="max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <LiaFlagUsaSolid className="w-16 h-16 text-amber-500 dark:text-gray-400 mb-3 m-auto" />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-amber-800 dark:text-white">
                Domínio Bilíngue Natural
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Desenvolva fluência em português e inglês através de jogos e
              histórias que tornam o aprendizado irresistivelmente divertido.
            </p>
          </div>
        </div>
      </section>

      <section className=" dark:bg-gray-900 p-5">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Simples, Rápido e Mágico: Como Começar
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
            Em apenas três passos, transforme a rotina do seu filho em uma
            aventura educativa inesquecível.
          </p>
        </div>

        <ol className="items-center sm:flex">
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-amber-100 rounded-full ring-0 ring-white dark:bg-amber-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <FaWandMagicSparkles className="w-10 h-10 text-amber-800 dark:text-amber-300" />
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-2xl font-semibold text-amber-600 dark:text-white">
                Selecione ou Crie Imagens
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Escolha imagens prontas ou permita que a IA gere personagens
                personalizados para dar vida à sua história.
              </p>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-amber-100 rounded-full ring-0 ring-white dark:bg-amber-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <FaWandMagicSparkles className="w-10 h-10 text-amber-800 dark:text-amber-300" />
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-2xl font-semibold text-amber-600 dark:text-white">
                A Magia da IA Acontece
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Nossa tecnologia avançada converte suas escolhas em narrativas
                envolventes, educativas e personalizadas em segundos.
              </p>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-amber-100 rounded-full ring-0 ring-white dark:bg-amber-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <FaWandMagicSparkles className="w-10 h-10 text-amber-800 dark:text-amber-300" />
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-2xl font-semibold text-amber-600 dark:text-white">
                Explore, Jogue e Evolua
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Ouça as histórias, participe de jogos interativos e salve suas
                favoritas para revisitar – aprendizado através da pura diversão!
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className=" dark:bg-gray-900 p-5">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Planos Acessíveis e Flexíveis
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
            Escolha o plano perfeito para sua família e cancele a qualquer
            momento sem complicações.
          </p>
        </div>

        <div className="w-full max-w-sm p-4 m-auto bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Plano Família Premium
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">R$</span>
            <span className="text-5xl font-extrabold tracking-tight text-amber-800">
              19,90
            </span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              /Mês
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Histórias personalizadas ilimitadas com IA
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Áudio completo em português e inglês para aprendizado fluido
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Acesso total a jogos educativos interativos
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Armazenamento ilimitado de histórias favoritas
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Biblioteca completa de sons de animais e natureza
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Crie e ouça histórias ilimitadas
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Suporte prioritário 24/7
              </span>
            </li>
            <li className="flex">
              <svg
                className="shrink-0 w-4 h-4 text-amber-700 dark:text-amber-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Cancele a qualquer momento sem taxas
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-200 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Assine Agora e Transforme o Futuro do Seu Filho
          </button>
        </div>
      </section>

      <section className=" dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Veja o Que Pais Satisfeitos Estão Dizendo
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
            Milhares de famílias já elevaram o aprendizado de seus filhos com
            Histórias Mágicas IA – confira os resultados reais!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <div className="block max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-amber-200 dark:text-amber-800 ms-3">
                5.0
              </span>
            </div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-700 dark:text-white">
              Maria Silva, Mãe de Duas Crianças
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              "Minha filha de 5 anos está obcecada! Ela cria histórias
              diariamente e aprende inglês de forma natural e divertida."
            </p>
          </div>

          <div className="block max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-amber-200 dark:text-amber-800 ms-3">
                5.0
              </span>
            </div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-700 dark:text-white">
              João Santos, Pai de Pedro (6 anos)
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              "A IA cria histórias incríveis e personalizadas. Pedro não para de
              usar, e o melhor: ele está aprendendo enquanto se diverte!"
            </p>
          </div>

          <div className="block max-w-sm p-6 bg-amber-100 border-4 border-amber-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-amber-200 dark:text-amber-800 ms-3">
                5.0
              </span>
            </div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-700 dark:text-white">
              Ana Costa, Professora e Mãe
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              "Como educadora, recomendo de olhos fechados! É pedagógico,
              envolvente e desperta a criatividade como nada igual."
            </p>
          </div>
        </div>
      </section>

      <section className=" dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Respostas para Suas Dúvidas Mais Comuns
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
            Descubra tudo sobre Histórias Mágicas IA e comece a jornada mágica
            hoje mesmo.
          </p>
        </div>

        <div className="max-w-screen-md mx-auto p-10 dark:bg-gray-800">




          <ul>
            <li className="text-bold">Para qual faixa etária é recomendado?</li>
            <li>Histórias Mágicas IA é perfeito para crianças de 4 a 8 anos,
                  com conteúdo adaptado automaticamente à idade para máxima
                  engajamento e segurança.</li>

            <li className="text-bold">Como funciona o aprendizado bilíngue?</li>
            <li>As crianças ouvem palavras e histórias em português e inglês,
                  jogam combinando as traduções e absorvem naturalmente ambos os
                  idiomas.</li>

            <li className="text-bold">É seguro para crianças?</li>
            <li>Sim! Todo conteúdo é gerado com filtros de segurança, sem
                  anúncios e adequado para crianças. Certificado por pedagogos.</li>

            <li className="text-bold">Posso usar em múltiplos dispositivos?</li>
            <li>Sim! Sua assinatura funciona em até 3 dispositivos
                  simultaneamente. Perfeito para famílias com mais de uma
                  criança.</li>

            <li className="text-bold">Como cancelo minha assinatura?</li>
            <li>Você pode cancelar a qualquer momento com apenas um clique na
                  área de configurações. Sem taxas ou burocracia.</li>

            <li className="text-bold">Existe versão offline?</li>
            <li>No plano Premium, você pode baixar histórias para ouvir
                  offline. Perfeito para viagens!</li>
          </ul>

        </div>
      </section>

      <section className=" dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text md:text-5xl lg:text-6xl dark:text-white">
            Pronto para Desbloquear o Potencial Ilimitado do Seu Filho?
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
            Una-se a milhares de famílias que estão revolucionando o aprendizado
            infantil com histórias mágicas, criatividade e bilinguismo.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900"
            >
              Transform o Futuro do Seu Filho
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Assine Agora!
            </a>
          </div>
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
