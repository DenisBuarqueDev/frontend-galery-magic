import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { GiMusicalNotes, GiSoundOff } from "react-icons/gi";
import { FaRegTrashCan } from "react-icons/fa6";
import api from "../axios/api";

const Store = () => {
  const { user } = useContext(AuthContext);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // 🔹 Buscar todas as histórias salvas do usuário autenticado
  const fetchHistories = async () => {
    if (!user?._id) {
      alert("Usuário não autenticado!");
      return;
    }

    try {
      setLoading(true);

      // Chama a rota do backend
      const response = await api.get(`/stories/${user._id}`);

      if (response.data.success) {
        const { data } = response.data;
        setStories(data);
      } else {
        alert("Erro ao carregar histórias do servidor.");
      }
    } catch (error) {
      console.error("❌ Erro ao buscar histórias do usuário:", error);
      alert("Erro ao buscar histórias no servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  // remove o item do localStorage
  const deleteHistory = async (historyId) => {
    try {
      setLoading(true);

      const response = await api.delete(`/stories/${historyId}`);

      if (response.data.success) {
        //alert("História excluída com sucesso!");
        // Atualiza a lista local após exclusão
        setStories((prev) => prev.filter((story) => story._id !== historyId));
        window.speechSynthesis.cancel();
      } else {
        alert("Erro ao excluir história.");
      }
    } catch (error) {
      console.error("❌ Erro ao excluir história:", error);
      alert("Erro ao excluir história do servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 🎧 Função para "escutar" a história com voz natural do navegador
  const speakStory = (storyText) => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta leitura de texto em voz alta.");
      return;
    }

    if (isReading) {
      pararLeitura();
      return;
    }

    // Interrompe qualquer leitura anterior
    window.speechSynthesis.cancel();
    setIsReading(true);

    const utterance = new SpeechSynthesisUtterance(storyText);

    // Configurações de voz
    utterance.lang = "pt-BR"; // voz em português
    utterance.rate = 1; // velocidade (1 é o normal)
    utterance.pitch = 1; // tom da voz
    utterance.volume = 1; // volume máximo

    // Inicia a leitura
    window.speechSynthesis.speak(utterance);
  };

  const pararLeitura = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  return (
    <main className="flex flex-col p-3 m-auto w-full max-w-screen-xl md:p-4">
      {/* 🔥 Overlay de loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <p className="text-2xl text-white font-bold mt-4">
            Carregado histórias...
          </p>
        </div>
      )}

      <section className="p-2 mx-auto max-w-screen-xl text-center mb-6">
        <div className="">
          <h1 className="text-5xl bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text font-extrabold tracking-tight">
            Histórias Mágicas
          </h1>
        </div>
        <p className="text-xl font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          {stories.length > 0
            ? "Transforme sua imaginação com histórias únicas!"
            : "Você não tem histórias guardadas, crie suas histórias."}
        </p>
      </section>

      <section className="flex flex-col w-full gap-4 mx-auto max-w-screen-xl">
        {stories &&
          stories.map((story) => (
            <div
              key={story.title}
              id="alert-additional-content-1"
              className="flex items-center  w-full p-4 border-4 border-amber-200 shadow-md rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
              role="alert"
            >
              <div className="flex flex-col  w-full">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-bold text-amber-700">
                    {story.title}
                  </h3>

                  <div
                    className="inline-flex gap-5 rounded-md shadow-xs"
                    role="group"
                  >
                    <button
                      onClick={() => speakStory(story.text)}
                      type="button"
                      className="inline-flex items-center p-2 text-sm font-medium text-black rounded-md dark:bg-orange-800 dark:border-orange-700 dark:text-white dark:hover:text-white dark:hover:bg-orange-700 dark:focus:text-white"
                    >
                      {isReading ? (
                        <GiSoundOff className="w-8 h-8" />
                      ) : (
                        <GiMusicalNotes className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteHistory(story._id)}
                      type="button"
                      className="inline-flex items-center p-2 text-sm font-medium text-black rounded-md dark:bg-orange-800 dark:border-orange-700 dark:text-white dark:hover:text-white dark:hover:bg-orange-700 dark:focus:text-white"
                    >
                      <FaRegTrashCan className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-lg text-amber-600 font-normal">
                  {story.text}
                </div>
              </div>
            </div>
          ))}
      </section>

      <div className="w-full h-6"></div>
    </main>
  );
};

export default Store;
