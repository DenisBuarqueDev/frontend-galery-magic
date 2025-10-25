import { useContext, useEffect, useState, useCallback } from "react";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
// api
import api from "../axios/api";
// Context
import { useProducts } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthContext";
// icons
import { GiMusicalNotes, GiSpeaker } from "react-icons/gi";
import { GrGamepad } from "react-icons/gr";
// componets
import TopOfPage from "../components/TopOfPage";

const English = () => {
  const { user } = useContext(AuthContext);

  const { products, loading, loadingLetters } = useProducts();

  const [creatingStory, setCreatingStory] = useState(false);

  const playSound = (sound) => new Audio(sound).play();

  const readTitle = (title) => {
    if (!window.speechSynthesis) {
      toast.info("Seu navegador não suporta leitura de voz.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const getDuasLetras = (titulo) => {
    if (typeof titulo !== "string" || titulo.length === 0) return "";
    return `${titulo.charAt(0).toUpperCase()} - ${titulo
      .charAt(0)
      .toLowerCase()}`;
  };

  if (loading || loadingLetters)
    return (
      <div className="flex items-center justify-center text-amber-600 font-bold">
        Carregando Galeria...
      </div>
    );

  if (creatingStory) return "Criando imagens...";

  // === Render ===
  return (
    <main className="flex flex-col p-2 m-auto w-full max-w-screen-xl md:p-4">
      {/* Overlays */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <p className="text-2xl text-white font-bold mt-4">
            Carregando Galeria...
          </p>
        </div>
      )}

      <TopOfPage title="Word English" subtitle="Aprenda brincando!" />

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-screen-xl w-full">
        {products.map((item) => (
          <article
            key={item._id}
            className="flex flex-col bg-yellow-100 items-center justify-center border-4 border-amber-200 p-2 shadow-md rounded-lg hover:scale-105 transition-transform dark:bg-gray-800"
          >
            <span
              className="font-normal text-amber-700 text-xl"
              style={{ fontFamily: "PlaywriteDESAS-Regular" }}
            >
              {getDuasLetras(item.english)}
            </span>

            <img
              src={item.image}
              alt={item.title}
              className="mb-2 w-full object-cover rounded-md"
            />

            <div className="flex flex-col w-full md:justify-between">
              <div className="flex flex-col mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <p className="text-xl text-center font-bold text-amber-700 truncate">
                    {item.english}
                  </p>
                </div>
                <p className="block w-full text-md font-normal text-amber-400">
                  {item.title}
                </p>
              </div>

              <div className="flex items-center justify-between gap-1 mt-3">
                {item.sound && (
                  <button
                    onClick={() => playSound(item.sound)}
                    title="Ouvir som"
                    className="flex-1 border border-amber-200 p-2 rounded text-amber-600 focus:bg-amber-600 focus:text-white"
                  >
                    <GiMusicalNotes className="w-5 h-5 m-auto" />
                  </button>
                )}

                <button
                  onClick={() => readTitle(item.english)}
                  title="Ouvir título"
                  className="flex-1 border border-amber-200 p-2 rounded text-amber-600 focus:bg-amber-600 focus:text-white"
                >
                  <GiSpeaker className="w-6 h-6 m-auto" />
                </button>

                <Link
                  to={`/wordgame/${item._id}/en`}
                  className="flex-1 border border-amber-200 p-2 rounded text-amber-600 focus:bg-amber-600 focus:text-white"
                >
                  <GrGamepad className="w-6 h-6 m-auto" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default English;
