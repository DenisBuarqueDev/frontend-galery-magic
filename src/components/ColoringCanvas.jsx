// src/components/ColoringCanvas.jsx
import React, { useRef, useEffect, useState } from "react";

const colors = [
  "#4F4F4F",
  "#DCDCDC",
  "#00008B",
  "#0000FF",
  "#00CCFF",
  "#00BFFF",
  "#87CEEB",
  "#008000",
  "#32CD32",
  "#7FFF00",
  "#808000",
  "#BDB76B",
  "#FFDEAD",
  "#8B008B",
  "#FF00FF",
  "#FF69B4",
  "#FF0000",
  "#FF8C00",
  "#FFD700",
  "#FFFF00",
  "#D2691E",
  "#E0FFFF",
  "#EEE8AA",
  "#FFFFFF",
];

const ColoringCanvas = ({ svgUrl, width = 600, height = 600 }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [history, setHistory] = useState([]); // 🆕 pilha de estados anteriores

  // 🔹 Inicializa o canvas e desenha o SVG
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctxRef.current = ctx;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = svgUrl;

    img.onload = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [svgUrl]);

  // 🔹 Conversão HEX → RGBA
  const hexToRgba = (hex) => {
    const parsed = hex.replace("#", "");
    return [
      parseInt(parsed.substring(0, 2), 16),
      parseInt(parsed.substring(2, 4), 16),
      parseInt(parsed.substring(4, 6), 16),
      255,
    ];
  };

  // 🔹 Flood fill otimizado
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx) return;

    // 🆕 Salva o estado anterior antes de pintar
    const previousState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => {
      const updated = [...prev, previousState];
      return updated.length > 10 ? updated.slice(1) : updated; // máximo 10 passos
    });

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixel(data, x, y, canvas.width);
    const fillColor = hexToRgba(selectedColor);

    if (colorsMatch(targetColor, fillColor)) return;

    const stack = [[x, y]];
    while (stack.length) {
      const [cx, cy] = stack.pop();
      let nx = cx;

      while (
        nx >= 0 &&
        colorsMatch(getPixel(data, nx, cy, canvas.width), targetColor)
      )
        nx--;
      nx++;

      let spanAbove = false;
      let spanBelow = false;

      while (
        nx < canvas.width &&
        colorsMatch(getPixel(data, nx, cy, canvas.width), targetColor)
      ) {
        setPixel(data, nx, cy, canvas.width, fillColor);

        if (cy > 0) {
          if (colorsMatch(getPixel(data, nx, cy - 1, canvas.width), targetColor)) {
            if (!spanAbove) {
              stack.push([nx, cy - 1]);
              spanAbove = true;
            }
          } else spanAbove = false;
        }

        if (cy < canvas.height - 1) {
          if (colorsMatch(getPixel(data, nx, cy + 1, canvas.width), targetColor)) {
            if (!spanBelow) {
              stack.push([nx, cy + 1]);
              spanBelow = true;
            }
          } else spanBelow = false;
        }
        nx++;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // 🧩 Helpers
  const getPixel = (data, x, y, width) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };

  const setPixel = (data, x, y, width, color) => {
    const i = (y * width + x) * 4;
    data[i] = color[0];
    data[i + 1] = color[1];
    data[i + 2] = color[2];
    data[i + 3] = color[3];
  };

  const colorsMatch = (a, b, tolerance = 25) =>
    Math.abs(a[0] - b[0]) <= tolerance &&
    Math.abs(a[1] - b[1]) <= tolerance &&
    Math.abs(a[2] - b[2]) <= tolerance;

  // 🆕 Botão “Voltar preenchimento”
  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const lastState = history[history.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setHistory((prev) => prev.slice(0, -1)); // remove o último estado
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 max-w-sm m-auto w-full">
        {colors.map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              width: 40,
              height: 40,
              margin: 2,
              border:
                selectedColor === color ? "2px solid black" : "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      {/* 🆕 Botão de voltar preenchimento */}
      <button
        onClick={handleUndo}
        disabled={history.length === 0}
        className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold shadow hover:bg-yellow-500 disabled:opacity-50"
      >
        Voltar preenchimento
      </button>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className="cursor-crosshair m-auto bg-white mt-5 flex max-w-sm w-full p-2 rounded-lg shadow"
      />
    </div>
  );
};

export default ColoringCanvas;
