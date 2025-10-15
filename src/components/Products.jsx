import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import { GiMusicalNotes, GiSpeaker } from "react-icons/gi";

const Products = ({ setWriteHistory, count, setIsReading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingStory, setCreatingStory] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getHistory = () => {
    try {
      const data = localStorage.getItem("#MagicHistory");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Erro ao carregar histórias do localStorage:", err);
      return [];
    }
  };

  const addToHistory = async (galery) => {
    setWriteHistory(true);
    setCreatingStory(true);

    try {
      const history = getHistory();

      const exists = history.find((item) => item.title === galery.title);
      if (exists) {
        setCreatingStory(false);
        setWriteHistory(false);
        return;
      }

      if (count >= 5) {
        alert(
          "Limite de 5 histórias atingido. Exclua algumas histórias antigas para adicionar novas."
        );
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

      const updatedHistory = [...history, newItem];
      localStorage.setItem("#MagicHistory", JSON.stringify(updatedHistory));

      window.dispatchEvent(new Event("localStorageUpdated"));
      window.speechSynthesis.cancel();
      setIsReading(false);
    } catch (err) {
      console.error("Erro addToHistory: ", err);
      alert("Erro ao gerar história mágica. Tente novamente.");
    } finally {
      setCreatingStory(false);
      setWriteHistory(false);
    }
  };

  const playSound = (clickSound) => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  // 🗣️ Função que lê o título do produto em voz alta
  const readTitle = (title) => {
    if (!window.speechSynthesis) {
      alert("Seu navegador não suporta leitura de voz.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // 🔤 Função que retorna "Ba" para "Barco"
  const getDuasLetras = (titulo) => {
    if (typeof titulo !== "string" || titulo.length === 0) return "";
    const primeira = titulo.charAt(0).toUpperCase();
    const segunda = titulo.charAt(0).toLowerCase();
    return `${primeira} - ${segunda}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        Carregando Galeria...
      </div>
    );
  }

  if (creatingStory) {
    return "Criando História...";
  }

  return (
    <section className="flex max-w-screen-xl my-5">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-screen-xl w-full">
        {products &&
          products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col bg-yellow-100 items-center justify-center max-w-screen-ms w-full border-4 border-amber-200 p-4 shadow-amber-200 shadow-md rounded-lg hover:scale-105 transition-transform dark:bg-gray-800"
            >
              {/* 🔤 Mostra as duas letras (ex: Ba) */}
              <span className="font-normal text-amber-700 text-xl" style={{ fontFamily: "PlaywriteDESAS-Regular" }}>
                {getDuasLetras(item.title)}
              </span>

              <Link onClick={() => addToHistory(item)}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-2 w-full object-cover rounded-md"
                />
              </Link>

              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold text-amber-600 truncate">
                  {item.title}
                </span>

                <div className="flex items-center gap-1">
                  {/* 🔊 Botão para ler o título */}
                  <button
                    onClick={() => readTitle(item.title)}
                    title="Ouvir título"
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <GiSpeaker className="w-6 h-6 text-amber-600" />
                  </button>
                  {/* 🎵 Se tiver som, mostra o botão musical */}
                  {item.sound && (
                    <button
                      onClick={() => playSound(item.sound)}
                      title="Ouvir som"
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <GiMusicalNotes className="w-5 h-5 text-amber-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Products;
