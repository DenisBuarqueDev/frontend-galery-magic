import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiMusicalNotes, GiSpeaker } from "react-icons/gi";
import { GrGamepad } from "react-icons/gr";
import { toast } from "react-toastify";
import { useProducts } from "../context/ProductsContext";
import api from "../axios/api";

const Products = ({ setWriteHistory, count, setIsReading }) => {
  const { products, letters, loading, loadingLetters } = useProducts();

  const [creatingStory, setCreatingStory] = useState(false);

  //const [isOpen, setIsOpen] = useState(false);
  //const toggleMenu = () => setIsOpen((prev) => !prev);

  const getHistory = () => {
    try {
      const data = localStorage.getItem("#MagicHistory");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      toast.info("Erro ao carregar histórias!");
      console.error("Erro ao carregar histórias do localStorage:", err);
      return [];
    }
  };

  const addToHistory = async (galery) => {
    setWriteHistory(true);
    setCreatingStory(true);

    try {
      const stories = getHistory();

      if (stories.some((item) => item.title === galery.title)) {
        setCreatingStory(false);
        setWriteHistory(false);
        return;
      }

      if (count >= 5) {
        toast.info("Limite de 5 personagens por história atingido.");
        setCreatingStory(false);
        setWriteHistory(false);
        return;
      }

      const res = await api.post(`/products/gemini/story`, {
        word: galery.title,
      });

      if (!res.data?.story) throw new Error("Erro: nenhuma história recebida.");

      const newItem = {
        title: galery.title,
        image: galery.image,
        description: res.data.story,
      };

      const updatedHistory = [...stories, newItem];
      localStorage.setItem("#MagicHistory", JSON.stringify(updatedHistory));

      window.dispatchEvent(new Event("localStorageUpdated"));
      window.speechSynthesis.cancel();
      setIsReading(false);
    } catch (err) {
      console.error("Erro addToHistory: ", err);
      toast.error("Erro ao gerar história mágica. Tente novamente.");
    } finally {
      setCreatingStory(false);
      setWriteHistory(false);
    }
  };

  const playSound = (sound) => new Audio(sound).play();

  const readTitle = (title) => {
    if (!window.speechSynthesis) {
      toast.info("Seu navegador não suporta leitura de voz.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.lang = "pt-BR";
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

  return (
    <main className="flex flex-col max-w-screen-xl my-5">
      
      {!letters && letters.length > 0 && (
        <section className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-4">
          {letters.map((value) => (
            <button
              key={value._id}
              onClick={() => readTitle(value.letter)}
              className="border border-amber-600 p-2 rounded-md shadow-md text-xl text-amber-600 focus:bg-amber-600 focus:text-white"
              style={{ fontFamily: "PlaywriteDESAS-Regular" }}
            >
              {value.letter}
            </button>
          ))}
        </section>
      )}

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-screen-xl w-full">
        {products.map((item) => (
          <article
            key={item._id}
            className="flex flex-col bg-yellow-100 items-center justify-center border-4 border-amber-200 p-4 shadow-md rounded-lg hover:scale-105 transition-transform dark:bg-gray-800"
          >
            <span
              className="font-normal text-amber-700 text-xl"
              style={{ fontFamily: "PlaywriteDESAS-Regular" }}
            >
              {getDuasLetras(item.title)}
            </span>

            <Link onClick={() => addToHistory(item)}>
              <img
                src={item.image}
                alt={item.title}
                className="mb-2 w-full object-cover rounded-md"
              />
            </Link>

            <div className="flex flex-col w-full md:flex-row md:justify-between">
              <span className="flex items-center gap-2 text-xl text-center font-bold text-amber-700 truncate mb-2 md:mb-0">
                {item.sound && (
                  <button
                    onClick={() => playSound(item.sound)}
                    title="Ouvir som"
                  >
                    <GiMusicalNotes className="w-5 h-5 text-amber-600" />
                  </button>
                )}

                {item.title}
              </span>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => readTitle(item.title)}
                  title="Ouvir título"
                >
                  <GiSpeaker className="w-6 h-6 text-amber-600" />
                </button>

                <Link to={`/wordgame/${item._id}/pt`}>
                  <GrGamepad className="w-6 h-6 text-amber-600" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Products;
