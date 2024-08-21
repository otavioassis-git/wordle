import { useEffect, useState } from "react";
import { MainWindow, Title } from "./App.styles";
import Board from "./components/Board/Board";

const API_URL =
  "https://gist.githubusercontent.com/viniciusalmada/cc1b768d773f98422102b21af3110efc/raw/4056de5426a9501b00b3d38186e6946b5eb866f1/Termo%2520palavras";

function App() {
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = (await response.text())
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split('"')
        .filter(
          (word) =>
            word.length == 5 && !word.includes("-") && !word.includes(".")
        );

      setTargetWord(words[Math.floor(Math.random() * words.length)]);
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
