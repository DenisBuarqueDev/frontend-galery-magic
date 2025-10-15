function LetterTile({ letter, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 15px",
        fontSize: "20px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "1px solid #333",
      }}
    >
      {letter}
    </button>
  );
}

export default LetterTile;
