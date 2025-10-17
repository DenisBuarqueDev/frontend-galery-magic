import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";
import LetterTile from "../components/LetterTile";
import WordDisplay from "../components/WordDisplay";
import Feedback from "../components/Feedback";
import { IoMdArrowRoundBack } from "react-icons/io";

// Função para embaralhar as letras
function shuffleArray(array) {
  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

// Função para normalizar texto: remover acentos, espaços e caracteres especiais
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD") // separa os acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]/g, ""); // remove caracteres que não sejam letras ou números
}

const WordGame = () => {
  const { id, linguage } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cleanTitle, setCleanTitle] = useState(""); // título limpo
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.error("Erro fetchProduct:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Quando o produto é carregado, limpar e embaralhar o título
  useEffect(() => {
    if (!product) return;

    const normalized = normalizeText(linguage == "pt" ? product.title : product.english);

    setCleanTitle(normalized);
    setShuffledLetters(shuffleArray(normalized.split("")));
    setSelectedLetters([]);
    setIsComplete(false);
    setIsCorrect(false);
  }, [product]);

  // Selecionar letra
  const selectLetter = (index) => {
    const letter = shuffledLetters[index];
    if (!letter) return;
    setSelectedLetters([...selectedLetters, { letter, index }]);
    setShuffledLetters(shuffledLetters.map((l, i) => (i === index ? null : l)));
  };

  // Remover letra
  const removeLetter = (selectedIndex) => {
    const removed = selectedLetters[selectedIndex];
    setShuffledLetters(
      shuffledLetters.map((l, i) => (i === removed.index ? removed.letter : l))
    );
    setSelectedLetters(selectedLetters.filter((_, i) => i !== selectedIndex));
  };

  // Verificar palavra formada
  useEffect(() => {
    if (!cleanTitle) return;
    if (selectedLetters.length === cleanTitle.length) {
      const wordFormed = selectedLetters.map((l) => l.letter).join("");
      setIsComplete(true);
      setIsCorrect(wordFormed === cleanTitle);
    } else {
      setIsComplete(false);
      setIsCorrect(false);
    }
  }, [selectedLetters, cleanTitle]);

  const onBack = () => navigate(-1);

  return (
    <main className="flex flex-col p-3 m-auto w-full max-w-screen-xl md:p-4">
      {/* 🔥 Overlay de loading */}
      {(loading || !product) && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <p className="text-2xl text-white font-bold mt-4">
            Carregando Game...
          </p>
        </div>
      )}

      <section className="p-2 mx-auto max-w-screen-xl text-center mb-6">
        <h1 className="text-5xl bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text font-extrabold tracking-tight">
          Monte a Palavra
        </h1>
        <p className="text-xl font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Toque sobre as letras para formar a palavra correta.
        </p>
      </section>

      <section style={{ textAlign: "center" }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white m-auto mb-4 px-4 py-2 bg-amber-600 rounded-full hover:bg-gray-400"
        >
          <IoMdArrowRoundBack /> Voltar
        </button>

        {product && (
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "250px", margin: "auto" }}
          />
        )}

        <div className="mt-5 max-w-screen-sm px-2 m-auto">
          <WordDisplay
            selectedLetters={selectedLetters}
            removeLetter={removeLetter}
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {shuffledLetters.map((letter, index) =>
            letter ? (
              <LetterTile
                key={index}
                letter={letter}
                onClick={() => selectLetter(index)}
              />
            ) : null
          )}
        </div>

        {isComplete && <Feedback isCorrect={isCorrect} />}
      </section>

      <div className="w-full h-6"></div>
    </main>
  );
};

export default WordGame;
