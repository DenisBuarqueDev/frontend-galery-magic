import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { GiMusicalNotes } from "react-icons/gi";
import { RiResetLeftFill } from "react-icons/ri";
import { GiSoundOff } from "react-icons/gi";
import { RiArchiveDrawerFill } from "react-icons/ri";
import api from "../axios/api";

import { GiBroom } from "react-icons/gi";

import Products from "../components/Products";

// supondo que você tenha sua chave em variável de ambiente e disponibilize de forma segura
const ELEVEN_API_KEY =
  "edb0cc5bbf64b2d95543034e5bf2ad66eb337751170e1b36d03d1f6639b08bee";
const VOICE_ID = "Xb7hH8MSUJpSbSDYk0k2"; // ou o ID da voz desejada
const MODEL_ID = "eleven_multilingual_v2";

const Gallery = () => {
  const { user } = useContext(AuthContext);

  const [stories, setStories] = useState([]);

  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [writeHistory, setWriteHistory] = useState(false);
  const [drawerHistory, setDrawerHistory] = useState(false);
  const [count, setCount] = useState(0);

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

    // Escuta mudanças externas (de outros componentes)
    const handleStorageChange = () => {
      fetchHistories();
    };

    // Custom event (gatilho interno via dispatchEvent)
    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);

  // 🚀 Reinicia a leitura (para e recomeça desde o início)
  const resetLeitura = () => {
    window.speechSynthesis.cancel(); // Para qualquer fala
    setIsReading(false);
    /*setTimeout(() => {
      lerTodasAsHistorias(); // Reinicia a leitura com os dados atualizados
    }, 500);*/
  };
  // remove o item do localStorage
  const removeItem = (title) => {
    const updatedItems = stories.filter((item) => item.title !== title);
    setStories(updatedItems);
    localStorage.setItem("#MagicHistory", JSON.stringify(updatedItems));
    const storedItems = JSON.parse(localStorage.getItem("#MagicHistory")) || [];
    setCount(storedItems.length);
    resetLeitura();
  };

  const clearHistories = () => {
    localStorage.removeItem("#MagicHistory");
    window.speechSynthesis.cancel(); // Para qualquer fala
    setIsReading(false);
    setStories([]);
    setCount(0);
  };

  const [isReading, setIsReading] = useState(false);

  // 🚀 Lê todas as histórias em sequência (com dados atualizados do localStorage)
  const lerTodasAsHistorias = () => {
    if (!window.speechSynthesis) {
      alert("Seu navegador não suporta leitura de voz (SpeechSynthesis).");
      return;
    }

    if (isReading) {
      pararLeitura();
      return;
    }

    // 🔄 Busca os dados ATUAIS do localStorage
    const data = localStorage.getItem("#MagicHistory");
    const historiasAtuais = data ? JSON.parse(data) : [];

    if (!historiasAtuais.length) {
      alert("Nenhuma história encontrada para leitura!");
      return;
    }

    // Cancela qualquer leitura anterior e marca como lendo
    window.speechSynthesis.cancel();
    setIsReading(true);

    // Cria falas para cada história
    const utterances = historiasAtuais.map((item, index) => {
      const texto = `${item.description}`;
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "pt-BR";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Quando chegar ao fim da última fala, define leitura como concluída
      utterance.onend = () => {
        if (index === historiasAtuais.length - 1) {
          setIsReading(false);
        }
      };

      return utterance;
    });

    // 🔊 Inicia a leitura em sequência
    utterances.forEach((u) => window.speechSynthesis.speak(u));
  };

  const pararLeitura = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  // 🔥 Função para salvar todas as histórias do localStorage no MongoDB
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
      setDrawerHistory(true); // Mostra o loader

      // 🔹 1. Cria título literário
      let combinedTitle = "";
      const titles = historias.map((h) => h.title);

      if (titles.length === 1) {
        combinedTitle = titles[0];
      } else if (titles.length === 2) {
        combinedTitle = `${titles[0]} e ${titles[1]}`;
      } else {
        combinedTitle = `${titles.slice(0, -1).join(", ")} e ${
          titles[titles.length - 1]
        }`;
      }

      // 🔹 2. Junta todas as descrições com separadores
      const combinedText = historias
        .map((h, i) => `${h.description}`)
        .join("\n\n");

      // 🔹 3. Envia apenas uma história para o backend
      const response = await api.post(`/stories/${user._id}`, {
        titles: combinedTitle,
        texts: combinedText,
      });

      if (response.data.success) {
        //alert("História combinada salva com sucesso!");
        clearHistories(); // limpa o localStorage
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

  async function gerarAudio() {
    setWriteHistory(true);
    setAudioUrl(null);
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVEN_API_KEY,
          },
          body: JSON.stringify({
            text: "Com um brilho mágico nos olhos, a pequena Sofia avistou um imenso castelo na colina, suas torres reluzindo ao sol como estrelas douradas. Decidida a explorar, ela correu em direção à grande porta de madeira, que estava entreaberta, convidando-a a entrar em aventuras incríveis. Ao cruzar o limiar, Sofia ouviu sussurros encantados que pareciam chamar seu nome, prometendo mistérios e tesouros além da imaginação!",
            model_id: MODEL_ID,
            output_format: "mp3_44100_128",
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error("Erro da API: " + err);
      }

      // transforma a resposta (stream binário) em Blob
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar áudio.");
    } finally {
      setWriteHistory(false);
    }
  }

  if (loading) {
    return "Carregando Galeria...";
  }

  if (writeHistory) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div role="status">
          <img src="/src/assets/dog-animi-gif.gif" className="w-40 h-40 mr-2" />
        </div>
        <p className="flex items-center text-xl text-white text-center font-bold rounded-full py-1 px-4 bg-amber-600">
          Criando história
          <FaWandMagicSparkles className="w-4 h-4 text-white ml-2" />
        </p>
      </div>
    );
  }

  if (drawerHistory) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div role="status">
          <img
            src="/src/assets/gaveta-anime-gif.gif"
            className="w-40 h-40 mr-2"
          />
        </div>
        <p className="text-2xl text-blue-700 font-bold">
          Guardando história...
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col p-2 m-auto w-full max-w-screen-xl md:p-4">
      <section className="p-2 mx-auto max-w-screen-xl text-center mb-6">
        <div className="">
          <h1 className="text-5xl px-8 bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text font-extrabold tracking-tight">
            Galeria Mágica
          </h1>
        </div>
        <p className="flex items-center justify-center text-center m-auto rounded-full w-[250px] mt-4 text-lg font-normal bg-amber-500 text-white py-1 px-3">
          Crie histórias únicas!{" "}
          <FaWandMagicSparkles className="w-4 h-4 text-white ml-2" />
        </p>
      </section>

      <section className="flex flex-col w-full gap-2 mx-auto max-w-screen-xl">
        {stories &&
          stories.map((story) => (
            <div
              key={story.title}
              id="alert-additional-content-1"
              className="flex flex-col md:flex-row items-center w-full p-4 border-4 border-amber-200 shadow-amber-200 shadow-md rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
              role="alert"
            >
              <img src={story.image} className="mr-3 w-24 h-24 object-cover" />
              <div className="flex flex-col  w-full">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-medium text-amber-700">
                    {story.title}
                  </h3>

                  <div
                    className="inline-flex rounded-md shadow-xs"
                    role="group"
                  >
                    <button
                      onClick={() => removeItem(story.title)}
                      type="button"
                      className="inline-flex items-center p-2 text-sm font-medium bg-orange-700 focus:bg-orange-500 text-white rounded-md dark:bg-orange-800 dark:border-orange-700 dark:text-white dark:hover:text-white dark:hover:bg-orange-700 dark:focus:text-white"
                    >
                      <GiBroom className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-lg text-amber-600">
                  {story.description}
                </div>
              </div>
            </div>
          ))}
      </section>

      {count > 0 && (
        <section className="flex gap-2 items-center justify-center mx-auto max-w-screen-xl mt-10">
          <div className="inline-flex rounded-md shadow-xs">
            <button
              onClick={lerTodasAsHistorias}
              disabled={loading}
              type="button"
              className="flex flex-col items-center px-4 py-2 text-sm font-medium text-orange-500 border-gray-200 rounded-lg hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white"
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
              type="button"
              className="flex flex-col items-center px-4 py-2 text-sm font-medium text-orange-500 border-gray-200 rounded-lg hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white"
            >
              <RiArchiveDrawerFill className="w-10 h-10" />
              Guardar
            </button>
            <button
              onClick={clearHistories}
              type="button"
              className="flex flex-col items-center px-4 py-2 text-sm font-medium text-orange-500 border-gray-200 rounded-lg hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-orange-500 dark:focus:text-white"
            >
              <RiResetLeftFill className="w-10 h-10" />
              Começar
            </button>
          </div>
        </section>
      )}

      {/* Products Component */}
      <Products setWriteHistory={setWriteHistory} count={count} setIsReading={setIsReading} />
    </main>
  );
};

export default Gallery;
