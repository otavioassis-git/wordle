import { useEffect, useState } from "react";
import { MainWindow, Title } from "./App.styles";
import Board from "./components/Board/Board";

const API_URL = "https://raw.githubusercontent.com/fserb/pt-br/master/palavras";

function App() {
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = (await response.text())
        .split("\n")
        .filter(
          (word) =>
            word.length == 5 && !word.includes("-") && !word.includes(".")
        );

      setTargetWord('vadio');
    };

    fetchWord();
  }, []);

  return (
    <MainWindow>
      <Title>Wordle</Title>
      <Board target={targetWord} />
      <div>{targetWord}</div>
    </MainWindow>
  );
}

export default App;
