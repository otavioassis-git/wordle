import { useEffect, useState } from "react";
import { MainWindow, Title } from "./App.styles";
import Board from "./components/Board/Board";

const API_URL =
  "https://raw.githubusercontent.com/fserb/pt-br/master/palavras";

function App() {
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      console.log(response);
      const words = (await response.text())
        .split("\n")
        .filter((word) => word.length == 5 && !word.includes("-") && !word.includes("."));

      setTargetWord(words[Math.floor(Math.random() * words.length)]);
    };

    fetchWord();
  }, []);

  return <MainWindow>
    <Title>Wordle</Title>
    <Board />
    <div></div>
  </MainWindow>;
}

export default App;
