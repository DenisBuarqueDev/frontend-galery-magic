import { createContext, useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; // Importa contexto de autenticação

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Pega token do AuthContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (products.length > 0) return; // Evita recarregar
    if (!token) return; // Não busca produtos se usuário não estiver logado

    setLoading(true);
    try {
      const res = await api.get("/products", {
        headers: {
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

  // Executa quando o token mudar
  useEffect(() => {
    fetchProducts();
  }, [token]); // <- se o token mudar (login/logout), refaz o fetch

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
