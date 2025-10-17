import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { GiMusicalNotes, GiSoundOff } from "react-icons/gi";
import { FaRegTrashCan } from "react-icons/fa6";
import api from "../axios/api";
import { toast } from "react-toastify";
import TopOfPage from "../components/TopOfPage";

const Store = () => {
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [readingId, setReadingId] = useState(null);
  const hasFetched = useRef(false);

  const fetchHistories = async () => {
    if (!user?._id) {
      toast.warning("Usuário não autenticado!");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      setLoading(true);

      // 🔹 Verifica cache com segurança
      const cached = sessionStorage.getItem(`stories_${user._id}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const data = parsed?.data || [];
          const timestamp = parsed?.timestamp || 0;
          const isExpired = Date.now() - timestamp > 5 * 60 * 1000; // 5 minutos

          if (!isExpired && Array.isArray(data) && data.length > 0) {
            setStories(data);
            setLoading(false);
            return; // cache válido
          }
        } catch (err) {
          console.warn("Cache corrompido, limpando...");
          sessionStorage.removeItem(`stories_${user._id}`);
        }
      }

      // 🔹 Busca do servidor
      const response = await api.get(`/stories/${user._id}`);

      if (response?.data?.success) {
        const data = response.data?.data || [];
        setStories(data);

        // 🔹 Atualiza cache com timestamp
        sessionStorage.setItem(
          `stories_${user._id}`,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } else {
        toast.error("Erro ao carregar histórias do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar histórias:", error);
      toast.error("Erro ao buscar histórias no servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();

    // Interrompe leitura ao desmontar o componente
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const deleteHistory = async (historyId) => {
    try {
      setLoading(true);
      const response = await api.delete(`/stories/${historyId}`);

      if (response.data.success) {
        setStories((prev) => prev.filter((s) => s._id !== historyId));
        window.speechSynthesis.cancel();
        sessionStorage.removeItem(`stories_${user._id}`);
        toast.success("História excluída!");
      } else {
        toast.error("Erro ao excluir história.");
      }
    } catch (error) {
      console.error("Erro ao excluir história:", error);
      toast.error("Erro ao excluir história!");
    } finally {
      setLoading(false);
    }
  };

  const speakStory = (id, text) => {
    if (!("speechSynthesis" in window)) {
      toast.info("Seu navegador não suporta leitura de voz.");
      return;
    }

    // Se já está lendo essa história, interrompe
    if (readingId === id) {
      stopReading();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => setReadingId(null);

    setReadingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setReadingId(null);
  };

  return (
    <main className="flex flex-col p-3 m-auto w-full max-w-screen-xl md:p-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="loader border-4 border-t-amber-400 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-2xl text-white font-bold mt-4">
            Carregando histórias...
          </p>
        </div>
      )}

      <TopOfPage
        title="Histórias Mágicas"
        subtitle="Transforme sua imaginação!"
      />

      <section className="flex flex-col w-full gap-4 mx-auto max-w-screen-xl">
        {stories.length === 0 && !loading && (
          <p className="text-center text-lg text-gray-600">
            Nenhuma história encontrada.
          </p>
        )}

        {stories.map((story) => (
          <article
            key={story._id}
            className="flex items-center w-full p-4 border-4 border-amber-200 shadow-md rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          >
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold text-amber-700">
                  {story.title}
                </h3>

                <div className="inline-flex gap-5">
                  <button
                    onClick={() => speakStory(story._id, story.text)}
                    type="button"
                    className="inline-flex items-center p-2 text-sm font-medium text-black rounded-md dark:bg-orange-800 dark:text-white hover:bg-orange-300"
                  >
                    {readingId === story._id ? (
                      <GiSoundOff className="w-7 h-7" />
                    ) : (
                      <GiMusicalNotes className="w-7 h-7" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteHistory(story._id)}
                    type="button"
                    className="inline-flex items-center p-2 text-sm font-medium text-black rounded-md dark:bg-orange-800 dark:text-white hover:bg-orange-300"
                  >
                    <FaRegTrashCan className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-lg text-amber-600 font-normal">
                {story.text}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Store;
