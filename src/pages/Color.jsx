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
    <main className="flex flex-col p-2 m-auto w-full max-w-screen-xl md:p-4">
      <h1 className="text-4xl font-semibold text-center text-amber-600 dark:text-white mb-4">
        {image.title}
      </h1>

      <div className="flex justify-center mb-4">
        <ColoringCanvas svgUrl={image.image} />
      </div>
    </main>
  );
};

export default Color;
