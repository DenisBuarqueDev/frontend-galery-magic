import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { GiMusicalNotes, GiSoundOff, GiBroom } from "react-icons/gi";
import { RiResetLeftFill, RiArchiveDrawerFill } from "react-icons/ri";
import { toast, Bounce } from "react-toastify";
import api from "../axios/api";
import Products from "../components/Products";
import TopOfPage from "../components/TopOfPage";
import { ImMagicWand } from "react-icons/im";

const Gallery = () => {
  const { user } = useContext(AuthContext);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writeHistory, setWriteHistory] = useState(false);
  const [drawerHistory, setDrawerHistory] = useState(false);
  const [count, setCount] = useState(0);
  const [isReading, setIsReading] = useState(false);

  // === Carregar histórias do localStorage ===
  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const storedItems = localStorage.getItem("#MagicHistory");
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setStories(parsedItems);
        setCount(parsedItems.length);
      } else {
        setStories([]);
        setCount(0);
      }
    } catch (err) {
      toast.error("Erro ao carregar histórias.");
      console.error("Erro ao carregar histórias:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Escuta atualizações do localStorage ===
  useEffect(() => {
    const handleStorageChange = () => fetchStories();

    // Evento personalizado
    window.addEventListener("localStorageUpdated", handleStorageChange);

    // Opcional: escuta mudanças reais entre abas
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
      window.speechSynthesis.cancel(); // garante que para a leitura
    };
  }, [fetchStories]);

  // === Carrega histórias ao montar ===
  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  // === Parar leitura ===
  const resetLeitura = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  }, []);

  // === Remover uma história ===
  const removeStorie = (title) => {
    const updatedItems = stories.filter((item) => item.title !== title);
    setStories(updatedItems);
    localStorage.setItem("#MagicHistory", JSON.stringify(updatedItems));
    setCount(updatedItems.length);
    resetLeitura();
    toast.success("História removida!");
  };

  // === Limpar todas as histórias ===
  const clearStories = () => {
    localStorage.removeItem("#MagicHistory");
    resetLeitura();
    setStories([]);
    setCount(0);
    toast.info("Galeria limpa!");
  };

  // === 🔹 Leitura de todas as histórias ===
  const readAllStories = () => {
    if (!window.speechSynthesis) {
      toast.info("Seu navegador não suporta leitura de voz.", {
        transition: Bounce,
      });
      return;
    }

    if (isReading) {
      resetLeitura();
      return;
    }

    const data = localStorage.getItem("#MagicHistory");
    const historiasAtuais = data ? JSON.parse(data) : [];

    if (!historiasAtuais.length) {
      toast.info("Nenhuma história encontrada para leitura!");
      return;
    }

    setIsReading(true);
    window.speechSynthesis.cancel();

    // Evita sobreposição de voz
    historiasAtuais.forEach((item, index) => {
      const texto = item.description;
      const utterance = new SpeechSynthesisUtterance(texto);
      // Configurações de voz
      utterance.lang = "pt-BR"; // voz em português
      utterance.rate = 1; // velocidade (1 é o normal)
      utterance.pitch = 1; // tom da voz
      utterance.volume = 1; // volume máximo

      utterance.onend = () => {
        if (index === historiasAtuais.length - 1) {
          setIsReading(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // === Salvar no MongoDB ===
  const saveStoriesToMongo = async () => {
    if (!user?._id) {
      toast.error("Usuário não autenticado!");
      return;
    }

    const storedData = localStorage.getItem("#MagicHistory");
    if (!storedData) {
      toast.info("Nenhuma história encontrada para salvar!");
      return;
    }

    const historias = JSON.parse(storedData);
    if (!historias.length) {
      toast.info("Nenhuma história encontrada para salvar!");
      return;
    }

    try {
      setDrawerHistory(true);

      const combinedTitle = historias.map((h) => h.title).join(", ");
      const combinedText = historias.map((h) => h.description).join("\n\n");

      const { data } = await api.post(`/stories/${user._id}`, {
        titles: combinedTitle,
        texts: combinedText,
      });

      if (data.success) {
        clearStories();
        toast.success("Histórias salvas com sucesso!");
      } else {
        toast.error("Erro ao salvar história!");
      }
    } catch (error) {
      console.error("Erro saveStoriesToMongo:", error);
      toast.error("Erro ao salvar história!");
    } finally {
      setDrawerHistory(false);
    }
  };

  // === Render ===
  return (
    <main className="flex flex-col p-2 m-auto w-full max-w-screen-xl md:p-4">
      {/* Overlays */}
      {(writeHistory || drawerHistory || loading) && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <p className="text-2xl text-white font-bold mt-4">
            {writeHistory
              ? "Criando História..."
              : drawerHistory
              ? "Guardando História..."
              : "Carregando Galeria..."}
          </p>
        </div>
      )}

      <TopOfPage title="Galeria Mágica" subtitle="Crie histórias únicas!" />

      {/* Histórias */}
      <section className="flex flex-col w-full gap-2 mx-auto max-w-screen-xl">
        {stories.map((story) => (
          <article
            key={story.title}
            className="flex flex-col md:flex-row md:justify-between w-full p-3 border-4 border-amber-200 shadow-md rounded-lg bg-yellow-100"
          >
            
            <div className="flex items-center justify-center flex-none">
              <img
                src={story.image}
                className="mr-3 w-24 h-24 object-cover rounded-lg"
                alt={story.title}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="flex items-center gap-2 text-3xl font-medium text-amber-700">
                  <ImMagicWand className="w-6 h-6" /> {story.title}
                </h3>
                <p className="text-lg text-amber-600">{story.description}</p>
              </div>
              <div>
                <button
                  onClick={() => removeStorie(story.title)}
                  className="p-2 text-sm font-medium bg-orange-700 text-white rounded-md hover:bg-orange-500"
                  title="Remover história"
                >
                  <GiBroom className="w-5 h-5" />
                </button>
              </div>
            </div>

          </article>
        ))}
      </section>

      {count > 0 && (
        <section className="flex gap-2 items-center justify-between m-auto max-w-screen-sm w-full mt-5 p-3">
          <button
            onClick={readAllStories}
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
            onClick={clearStories}
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
