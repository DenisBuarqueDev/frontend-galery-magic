function LetterTile({ letter, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 15px",
        fontSize: "30px",
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
