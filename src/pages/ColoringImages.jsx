import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopOfPage from "../components/TopOfPage";
import { useColoringImages } from "../context/ColoringImagesContext";

const ColoringImages = () => {
  const { images, loading, fetchColoringImages } = useColoringImages();
  const navigate = useNavigate();

  useEffect(() => {
    fetchColoringImages();
  }, []);

  const handleSelectImage = (id) => {
    navigate(`/color/${id}`);
  };

  return (
    <main className="flex flex-col items-center justify-center p-2">

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="loader border-4 border-t-amber-400 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-2xl text-white font-bold mt-4">
            Carregando imagens...
          </p>
        </div>
      )}

      <TopOfPage title="Colorindo Imagem" subtitle="Escolha para colorir!" />

      <div className="mt-6 flex flex-col items-center gap-2 max-w-screen-xl w-full px-3">
        {images.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Nenhuma imagem disponível.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ColoringImages;
