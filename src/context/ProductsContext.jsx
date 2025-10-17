import { createContext, useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLetters, setLoadingLetters] = useState(false);

  // Faz o fetch apenas uma vez (cache global)
  const fetchProducts = async () => {
    if (products.length > 0) return; // Evita recarregar
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
      console.error("Erro ao carregar produtos:", err);
      toast.error("Erro ao carregar produtos!");
    } finally {
      setLoading(false);
    }
  };

  const fetchLetters = async () => {
    if (letters.length > 0) return; // já em cache
    setLoadingLetters(true);
    try {
      const { data } = await api.get("/letters");
      setLetters(data.data || []);
    } catch (err) {
      console.warn("Aviso: não foi possível carregar letras:", err.message);
      toast.info("Não foi possível carregar letras!");
    } finally {
      setLoadingLetters(false);
    }
  };

  // Executa apenas uma vez no app inteiro
  useEffect(() => {
    fetchProducts();
    fetchLetters();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        letters,
        loading,
        loadingLetters,
        fetchProducts,
        fetchLetters
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useProducts = () => useContext(ProductsContext);
