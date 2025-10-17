import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import TopOfPage from "../components/TopOfPage";

const WordMatchGame = () => {
  const { products } = useProducts();

  const [ptCards, setPtCards] = useState([]);
  const [enCards, setEnCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [resetting, setResetting] = useState(false);
  const [score, setScore] = useState(0);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const initGame = () => {
    if (!products || products.length === 0) return;

    setLoading(true);
    setMessage("🔄 Embaralhando palavras...");

    setTimeout(() => {
      const random = shuffleArray(products).slice(0, 7);

      const pt = shuffleArray(
        random.map((item) => ({
          id: `${item.title}-pt`,
          text: item.title,
          lang: "pt",
          match: item.english,
        }))
      );

      const en = shuffleArray(
        random.map((item) => ({
          id: `${item.english}-en`,
          text: item.english,
          lang: "en",
          match: item.title,
        }))
      );

      setPtCards(pt);
      setEnCards(en);
      setSelected([]);
      setMatched([]);
      setMessage("");
      setLoading(false);
      setResetting(false);
      setScore(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  useEffect(() => {
    initGame();
  }, [products]);

  const handleSelect = (card) => {
    if (matched.includes(card.id) || selected.includes(card) || resetting)
      return;

    if (selected.length === 0) {
      setSelected([card]);
    } else if (selected.length === 1) {
      const first = selected[0];
      const second = card;

      if (first.lang === second.lang) return;

      setSelected([first, second]);

      if (first.text === second.match) {
        // ✅ Acertou
        setMatched((prev) => [...prev, first.id, second.id]);
        setSelected([]);
        setScore((prev) => prev + 10);
        setMessage("🎯 Correto!");
        // Som opcional:
        // new Audio("/sounds/correct.mp3").play();
        setTimeout(() => setMessage(""), 700);
      } else {
        // ❌ Errou
        setScore((prev) => Math.max(prev - 3, 0));
        setMessage("😅 Tente novamente!");
        // Som opcional:
        // new Audio("/sounds/wrong.mp3").play();
        setTimeout(() => {
          setSelected([]);
          setMessage("");
        }, 800);
      }
    }
  };

  const allMatched =
    matched.length === ptCards.length * 2 && ptCards.length > 0;

  const handleReset = () => {
    setResetting(true);
    setMessage("🔄 Reiniciando...");
    initGame();
  };

  /*if (loading)
    return (
      <div className="text-center mt-8 text-lg animate-pulse">
        Carregando palavras...
      </div>
    );
*/
  return (
    <main className="flex flex-col p-3 m-auto w-full max-w-screen-xl md:p-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="loader border-4 border-t-amber-400 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-2xl text-white font-bold mt-4">
            Carregando palavras...
          </p>
        </div>
      )}

      <TopOfPage title="Combine Palavras" subtitle="Português com Inglês" />

      <div className="flex flex-col items-center">
        {/* Pontuação */}
        <div className="mb-4 text-lg font-semibold text-amber-600">
          Pontuação: <span className="font-bold text-amber-800">{score}</span>
        </div>

        {message && (
          <div className="text-lg font-semibold mb-3 text-center animate-fade">
            {message}
          </div>
        )}

        {/* GRID lateral */}
        <div className="grid grid-cols-2 gap-3 max-w-2xl w-full">
          {/* Coluna esquerda - Português */}
          <div className="flex flex-col gap-3">
            {ptCards.map((card) => {
              const isMatched = matched.includes(card.id);
              const isSelected = selected.includes(card);

              return (
                <button
                  key={card.id}
                  onClick={() => handleSelect(card)}
                  disabled={isMatched || resetting}
                  className={`p-3 rounded-xl shadow-md text-center font-semibold transition-all duration-300 transform
                    ${
                      isMatched
                        ? "bg-amber-700 text-white"
                        : isSelected
                        ? "bg-amber-500 scale-105"
                        : "bg-white hover:bg-gray-100 active:scale-95"
                    }
                  `}
                >
                  {card.text}
                </button>
              );
            })}
          </div>

          {/* Coluna direita - Inglês */}
          <div className="flex flex-col gap-3">
            {enCards.map((card) => {
              const isMatched = matched.includes(card.id);
              const isSelected = selected.includes(card);

              return (
                <button
                  key={card.id}
                  onClick={() => handleSelect(card)}
                  disabled={isMatched || resetting}
                  className={`p-3 rounded-xl shadow-md text-center font-semibold transition-all duration-300 transform
                    ${
                      isMatched
                        ? "bg-amber-700 text-white"
                        : isSelected
                        ? "bg-amber-500 scale-105"
                        : "bg-white hover:bg-gray-100 active:scale-95"
                    }
                  `}
                >
                  {card.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mensagem final */}
        {allMatched && (
          <div className="mt-6 text-xl font-bold text-amber-700 animate-bounce text-center">
            Parabéns!
            <br />
            <span className="text-amber-600 text-lg">
              Você completou o jogo!
            </span>
          </div>
        )}

        {/* Botão Reset */}
        <button
          onClick={handleReset}
          disabled={resetting}
          className={`mt-6 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            resetting
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-amber-500 text-white hover:bg-amber-500"
          }`}
        >
          {resetting ? "Reiniciando..." : "Jogar novamente"}
        </button>
      </div>
    </main>
  );
};

export default WordMatchGame;
