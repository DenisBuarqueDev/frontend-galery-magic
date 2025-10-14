import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { GiMusicalNotes, GiSoundOff, GiBroom } from "react-icons/gi";
import { RiResetLeftFill, RiArchiveDrawerFill } from "react-icons/ri";
import api from "../axios/api";
import Products from "../components/Products";


const Gallery = () => {
  const { user } = useContext(AuthContext);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writeHistory, setWriteHistory] = useState(false);
  const [drawerHistory, setDrawerHistory] = useState(false);
  const [count, setCount] = useState(0);
  const [isReading, setIsReading] = useState(false);

  // 🔹 Carrega as histórias salvas no localStorage
  const fetchHistories = async () => {
    setLoading(true);
    try {
      const storedItems = localStorage.getItem("#MagicHistory");
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setStories(parsedItems);
        setCount(parsedItems.length);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();

    // Atualiza automaticamente se localStorage mudar
    const handleStorageChange = () => fetchHistories();
    window.addEventListener("localStorageUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
      // Garante que a leitura pare ao desmontar
      window.speechSynthesis.cancel();
    };
  }, []);

  const resetLeitura = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  // 🔹 Remover uma história
  const removeItem = (title) => {
    const updatedItems = stories.filter((item) => item.title !== title);
    setStories(updatedItems);
    localStorage.setItem("#MagicHistory", JSON.stringify(updatedItems));
    setCount(updatedItems.length);
    resetLeitura();
  };

  // 🔹 Limpar todas as histórias
  const clearHistories = () => {
    localStorage.removeItem("#MagicHistory");
    resetLeitura();
    setStories([]);
    setCount(0);
  };

  // 🔹 Ler todas as histórias (sem desmontar a tela)
  const lerTodasAsHistorias = () => {
    if (!window.speechSynthesis) {
      alert("Seu navegador não suporta leitura de voz (SpeechSynthesis).");
      return;
    }

    if (isReading) {
      resetLeitura();
      return;
    }

    const data = localStorage.getItem("#MagicHistory");
    const historiasAtuais = data ? JSON.parse(data) : [];

    if (!historiasAtuais.length) {
      alert("Nenhuma história encontrada para leitura!");
      return;
    }

    window.speechSynthesis.cancel();
    setIsReading(true);

    historiasAtuais.forEach((item, index) => {
      const texto = `${item.description}`;
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "pt-BR";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        if (index === historiasAtuais.length - 1) {
          setIsReading(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // 🔹 Salvar histórias combinadas no MongoDB
  const saveStoriesToMongo = async () => {
    if (!user?._id) {
      alert("Usuário não autenticado!");
      return;
    }

    const storedData = localStorage.getItem("#MagicHistory");
    if (!storedData) {
      alert("Nenhuma história encontrada para salvar!");
      return;
    }

    const historias = JSON.parse(storedData);
    if (!historias.length) {
      alert("Nenhuma história encontrada para salvar!");
      return;
    }

    try {
      setDrawerHistory(true);

      let combinedTitle = historias.map((h) => h.title).join(", ");
      const combinedText = historias.map((h) => h.description).join("\n\n");

      const response = await api.post(`/stories/${user._id}`, {
        titles: combinedTitle,
        texts: combinedText,
      });

      if (response.data.success) {
        clearHistories();
      } else {
        alert("Erro ao salvar história combinada.");
      }
    } catch (error) {
      console.error("❌ Erro ao salvar história combinada:", error);
      alert("Erro ao salvar história no servidor.");
    } finally {
      setDrawerHistory(false);
    }
  };

  // 🔹 Exibição de carregamento
  if (loading) return <p>Carregando Galeria...</p>;

  return (
    <main className="flex flex-col p-2 m-auto w-full max-w-screen-xl md:p-4">
      {/* 🔥 Overlay de loading */}
      {(writeHistory || drawerHistory) && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <p className="text-2xl text-white font-bold mt-4">
            {writeHistory ? (
              "Criando história..."
            ) : (
              "Guardando história..."
            )}
          </p>
        </div>
      )}

      <section className="p-2 mx-auto text-center mb-6">
        <h1 className="text-5xl px-8 bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text font-extrabold tracking-tight">
          Galeria Mágica
        </h1>
        <p className="flex items-center justify-center m-auto rounded-full w-[250px] mt-4 text-lg font-normal bg-amber-500 text-white py-1 px-3">
          Crie histórias únicas! <FaWandMagicSparkles className="w-4 h-4 ml-2" />
        </p>
      </section>

      <section className="flex flex-col w-full gap-2 mx-auto max-w-screen-xl">
        {stories.map((story) => (
          <div
            key={story.title}
            className="flex flex-col md:flex-row items-center w-full p-4 border-4 border-amber-200 shadow-amber-200 shadow-md rounded-lg bg-yellow-100"
          >
            <img src={story.image} className="mr-3 w-24 h-24 object-cover" />
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-medium text-amber-700">
                  {story.title}
                </h3>
                <button
                  onClick={() => removeItem(story.title)}
                  className="p-2 text-sm font-medium bg-orange-700 text-white rounded-md hover:bg-orange-500"
                >
                  <GiBroom className="w-5 h-5" />
                </button>
              </div>
              <p className="text-lg text-amber-600">{story.description}</p>
            </div>
          </div>
        ))}
      </section>

      {count > 0 && (
        <section className="flex gap-2 items-center justify-center mx-auto max-w-screen-xl mt-10">
          <button
            onClick={lerTodasAsHistorias}
            className="flex flex-col items-center px-4 py-2 text-sm font-medium text-orange-500 rounded-lg hover:text-orange-700"
          >
            {isReading ? (
              <>
                <GiSoundOff className="w-10 h-10" />
                Parar
              </>
            ) : (
              <>
                <GiMusicalNotes className="w-10 h-10" />
                Ouvir
              </>
            )}
          </button>

          <button
            onClick={saveStoriesToMongo}
            className="flex flex-col items-center px-4 py-2 text-sm font-medium text-orange-500 rounded-lg hover:text-orange-700"
          >
            <RiArchiveDrawerFill className="w-10 h-10" />
            Guardar
          </button>

          <button
            onClick={clearHistories}
            className="flex flex-col items-center px-4 py-2 text-sm font-medium text-orange-500 rounded-lg hover:text-orange-700"
          >
            <RiResetLeftFill className="w-10 h-10" />
            Começar
          </button>
        </section>
      )}

      <Products
        setWriteHistory={setWriteHistory}
        count={count}
        setIsReading={setIsReading}
      />
    </main>
  );
};

export default Gallery;
