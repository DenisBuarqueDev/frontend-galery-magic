// src/components/ColoringCanvas.jsx
import React, { useRef, useEffect, useState } from "react";

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#A52A2A",
  "#FFFFFF",
  "#000000",
  "#FFC0CB",
  "#808080",
  "#FFD700",
  "#00FA9A",
  "#8B4513",
  "#4682B4",
  "#FF69B4",
  "#4B0082",
  "#7FFF00",
  "#00CED1",
  "#FF4500",
  "#DA70D6",
  "#F0E68C",
];

const ColoringCanvas = ({ svgUrl, width = 600, height = 600 }) => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#FF0000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = svgUrl;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [svgUrl]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(
      ((e.clientY - rect.top) / rect.height) * canvas.height
    );

    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Função de Flood Fill
    const stack = [];
    const startPos = (y * canvas.width + x) * 4;
    const startColor = [
      data[startPos],
      data[startPos + 1],
      data[startPos + 2],
      data[startPos + 3],
    ];

    const hex = selectedColor.replace("#", "");
    const fillColor = [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
      255,
    ];

    const matchColor = (pos) =>
      data[pos] === startColor[0] &&
      data[pos + 1] === startColor[1] &&
      data[pos + 2] === startColor[2] &&
      data[pos + 3] === startColor[3];

    const setColor = (pos) => {
      data[pos] = fillColor[0];
      data[pos + 1] = fillColor[1];
      data[pos + 2] = fillColor[2];
      data[pos + 3] = fillColor[3];
    };

    stack.push([x, y]);
    while (stack.length) {
      const [cx, cy] = stack.pop();
      const pos = (cy * canvas.width + cx) * 4;
      if (!matchColor(pos)) continue;
      setColor(pos);

      if (cx + 1 < canvas.width) stack.push([cx + 1, cy]);
      if (cx - 1 >= 0) stack.push([cx - 1, cy]);
      if (cy + 1 < canvas.height) stack.push([cx, cy + 1]);
      if (cy - 1 >= 0) stack.push([cx, cy - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div>
      <div className="flex flex-wrap max-w-screen-md m-auto p-4 w-full">
        {colors.map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              width: 30,
              height: 30,
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
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick} 
        className="cursor-crosshair m-auto bg-white mt-5"
      />
    </div>
  );
};

export default ColoringCanvas;
