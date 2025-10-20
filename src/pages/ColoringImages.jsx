import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api"; // sua instância axios já configurada
import { toast } from "react-toastify";
import TopOfPage from "../components/TopOfPage";

const ColoringImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/coloring"); // rota do backend
        setImages(res.data.data || []);
      } catch (err) {
        console.error("Erro ao buscar imagens:", err);
        toast.error("Erro ao carregar imagens!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSelectImage = (id) => {
    navigate(`/color/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando imagens...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <TopOfPage title="Colorindo Imagem" subtitle="Escolha para colorir!" />

      <div className="mt-6 flex flex-col items-center gap-4 max-w-screen-xl w-full px-4">
        {images.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Nenhuma imagem disponível.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {images.map((item) => (
              <div
                key={item._id}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
                onClick={() => handleSelectImage(item._id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain bg-white"
                />
                <div className="p-2 bg-gray-100 dark:bg-gray-800">
                  <p className="text-center text-gray-800 dark:text-gray-200 font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ColoringImages;
