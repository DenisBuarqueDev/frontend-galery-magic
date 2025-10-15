function WordDisplay({ selectedLetters, removeLetter }) {
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {selectedLetters.map((l, i) => (
        <div
          key={i}
          onClick={() => removeLetter(i)}
          style={{
            padding: "10px 15px",
            borderBottom: "2px solid #333",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          {l.letter}
        </div>
      ))}
    </div>
  );
}

export default WordDisplay;
