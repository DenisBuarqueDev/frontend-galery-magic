import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import TopOfPage from "../components/TopOfPage";

const WordGuees = () => {
  const { products } = useProducts();

  const [currentProduct, setCurrentProduct] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  // Seleciona um produto aleatório e cria 5 opções
  const getRandomProduct = () => {
    if (!products || products.length < 6) return;

    const randomProduct =
      products[Math.floor(Math.random() * products.length)];

    // Gera 4 opções erradas
    const wrongOptions = products
      .filter((p) => p.english !== randomProduct.english)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((p) => p.english);

    // Mistura a correta com as erradas
    const allOptions = [...wrongOptions, randomProduct.english].sort(
      () => Math.random() - 0.5
    );

    setCurrentProduct(randomProduct);
    setOptions(allOptions);
    setMessage("");
  };

  useEffect(() => {
    if (products.length > 0) {
      getRandomProduct();
    }
  }, [products]);

  const handleAnswer = (option) => {
    if (!currentProduct) return;

    if (option === currentProduct.english) {
      setMessage("🎉 Muito bem! Você acertou!");
      setScore((prev) => prev + 1);

      // Espera 1,5s e vai para próxima imagem
      setTimeout(() => {
        getRandomProduct();
      }, 1500);
    } else {
      setMessage("❌ Tente novamente!");
    }
  };

  if (!currentProduct)
    return <div className="text-center mt-10">Carregando jogo...</div>;

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <TopOfPage
        title="Adivinhe a Palavra"
        subtitle="Toque na palavra certa!"
      />

      <div className="mt-6 flex flex-col items-center gap-4 max-w-screen-sm w-full px-4">
        <img
          src={currentProduct.image}
          alt={currentProduct.title}
          className="w-48 h-48 object-contain"
        />

        <div className="grid grid-cols-1 gap-3 mt-6 w-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="bg-white text-2xl w-full py-2 px-4 rounded-xl shadow hover:bg-yellow-100 transition-all border-2 border-transparent hover:border-yellow-400"
            >
              {option}
            </button>
          ))}
        </div>

        {message && (
          <div
            className={`mt-4 text-xl font-bold ${
              message.includes("Muito bem") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-4 text-lg font-semibold text-gray-600">
          Pontuação: {score}
        </div>
      </div>
    </main>
  );
};

export default WordGuees;
