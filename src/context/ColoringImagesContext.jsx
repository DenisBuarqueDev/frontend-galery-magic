import { createContext, useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; // Contexto de autenticação

export const ColoringImagesContext = createContext();

export const ColoringImagesProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Pega token do usuário logado
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * 🔹 Busca todas as imagens para colorir
   */
  const fetchColoringImages = async () => {
    if (!token) return; // Evita chamada sem autenticação

    setLoading(true);
    try {
      const res = await api.get("/coloring", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.data) {
        setImages(res.data.data);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("❌ Erro ao carregar imagens:", err);
      toast.error("Erro ao carregar imagens!");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🔁 Atualiza lista ao logar/deslogar
   */
  useEffect(() => {
    fetchColoringImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ColoringImagesContext.Provider
      value={{
        images,
        loading,
        fetchColoringImages,
      }}
    >
      {children}
    </ColoringImagesContext.Provider>
  );
};

/**
 * ✅ Hook customizado
 */
export const useColoringImages = () => useContext(ColoringImagesContext);
