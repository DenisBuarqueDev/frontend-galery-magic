import { createContext, useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Executa apenas uma vez no app inteiro
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useProducts = () => useContext(ProductsContext);
