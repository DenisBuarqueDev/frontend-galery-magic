import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";
import { toast } from "react-toastify";
import ColoringCanvas from "../components/ColoringCanvas";

const Color = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await api.get(`/coloring/${id}`);
        setImage(res.data.data);
      } catch (err) {
        console.error("Erro ao buscar imagem:", err);
        navigate("/"); // Redireciona se imagem não existir
      }
    };
    fetchImage();
  }, [id, navigate]);

  if (!image) return <p>Carregando...</p>;

  return (
    <div className="p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Colorir: {image.title}
      </h1>

      <div className="flex justify-center flex-wrap gap-2 mb-4">
        <ColoringCanvas svgUrl={image.image} width={600} height={600} />
      </div>
    </div>
  );
};

export default Color;
