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
    if (!products || products.length < 5) return;

    const randomProduct = products[Math.floor(Math.random() * products.length)];

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
      setMessage("Você acertou!");
      setScore((prev) => prev + 1);

      // Espera 1,5s e vai para próxima imagem
      setTimeout(() => {
        getRandomProduct();
      }, 1500);
    } else {
      setMessage("Tente novamente!");
    }
  };

  if (!currentProduct)
    return <div className="text-center mt-10">Carregando jogo...</div>;

  return (
    <main className="flex flex-col items-center justify-center p-4">
      
      <TopOfPage
        title="Adivinhe"
        subtitle="Qual é a palavra?"
      />

      {message && (
          <div
            className={`text-xl font-normal rounded-full px-8 py-1 text-center ${
              message.includes("Você acertou!") ? "text-white bg-blue-500" : "text-white bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

      <div className=" text-lg font-semibold text-gray-600">
        Pontuação: {score}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 max-w-screen-sm w-full px-4">
        <img
          src={currentProduct.image}
          alt={currentProduct.title}
          className="w-48 h-48 object-contain"
        />

        <div className="grid grid-cols-1 gap-3 mt-1 w-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="text-2xl border border-amber-300 text-amber-600 w-full py-2 px-4 rounded-full shadow hover:bg-amber-500 hover:text-white transition-all border-transparent"
            >
              {option}
            </button>
          ))}
        </div>

        
      </div>
    </main>
  );
};

export default WordGuees;
