function Feedback({ isCorrect }) {
  return (
    <div
      className={`mt-5 text-2xl py-2 px-5 text-center font-semibold max-w-screen-sm m-auto rounded-full text-white ${isCorrect ? "bg-blue-500" : "bg-red-500"}`}
    >
      {isCorrect ? "Você acertou!" : "Tente novamente!"}
    </div>
  );
}

export default Feedback;
