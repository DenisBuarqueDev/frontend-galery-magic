import { useEffect, useState } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import { GiMusicalNotes } from "react-icons/gi";

const Products = ({ setWriteHistory, count, setIsReading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingStory, setCreatingStory] = useState(false); // 🌟 Novo estado

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
      console.error("Erro carregar histórias do localStorage!:", err);
      return [];
    }
  };

  const addToHistory = async (galery) => {
    setWriteHistory(true);
    setCreatingStory(true); // 🌀 Mostra a animação de criação

    try {
      const history = getHistory();

      // Evita duplicadas
      const exists = history.find((item) => item.title === galery.title);
      if (exists) {
        console.log("Imagem já foi adicionada à história.");
        setCreatingStory(false);
        setWriteHistory(false);
        return;
      }

      // Checa limite de histórias
      if (count >= 5) {
        alert(
          "Limite de 5 histórias atingido. Por favor, exclua algumas histórias antigas para adicionar novas."
        );
        setCreatingStory(false);
        setWriteHistory(false);
        return;
      }

      // Chama IA Gemini via backend
      const res = await api.post(`/products/gemini/story`, {
        word: galery.title,
      });

      if (!res.data?.story) {
        throw new Error("Erro: nenhuma história recebida do servidor.");
      }

      // Cria o novo item
      const newItem = {
        title: galery.title,
        image: galery.image,
        description: res.data.story,
      };

      // Salva no localStorage
      const updatedHistory = [...history, newItem];
      localStorage.setItem("#MagicHistory", JSON.stringify(updatedHistory));

      // Dispara atualização para Galery.jsx
      window.dispatchEvent(new Event("localStorageUpdated"));
       window.speechSynthesis.cancel(); // Para qualquer fala
       setIsReading(false);
      //console.log("✅ História criada e salva com sucesso!");
    } catch (err) {
      console.error("Erro addToHistory: ", err);
      alert("Erro ao gerar história mágica. Tente novamente.");
    } finally {
      setCreatingStory(false); // 🔚 Esconde a animação
      setWriteHistory(false);
    }
  };

  const playSound = (clickSound) => {
    const audio = new Audio(clickSound);
    audio.play();
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
    <>
      <section className="flex max-w-screen-xl my-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-screen-xl w-full">
          {products &&
            products.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-yellow-100 items-center justify-center max-w-screen-ms w-full border-4 border-amber-200 p-4 shadow-amber-200 shadow-md rounded-lg hover:scale-105 transition-transform dark:bg-gray-800"
              >
                <Link onClick={() => addToHistory(item)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-2 w-full object-cover rounded-md"
                  />
                </Link>
                {item.sound ? (
                  <div className="flex items-center w-full justify-between">
                    <span className="text-xl font-bold text-amber-600">{item.title}</span>
                    <button onClick={() => playSound(item.sound)}>
                      <GiMusicalNotes className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <span className="text-xl font-bold text-amber-600">{item.title}</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Products;
