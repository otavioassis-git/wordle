import { useEffect, useState } from "react";
import { Footer, MainWindow, Title } from "./App.styles";
import Board from "./components/Board/Board";
import { Button, Typography } from "@mui/material";

const API_URL =
  "https://gist.githubusercontent.com/viniciusalmada/cc1b768d773f98422102b21af3110efc/raw/4056de5426a9501b00b3d38186e6946b5eb866f1/Termo%2520palavras";

export interface GameOver {
  isOver: boolean;
  win: boolean;
}

function App() {
  const [targetWord, setTargetWord] = useState("");
  const [gameOver, setGameOver] = useState<GameOver>({
    isOver: false,
    win: false,
  });

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
      <Board target={targetWord} setGameOver={setGameOver} />
      <Footer>
        {gameOver.isOver && !gameOver.win && (
          <>
            <Typography variant="body1">{targetWord}</Typography>
            <Button variant="contained">Restart</Button>
          </>
        )}
      </Footer>
    </MainWindow>
  );
}

export default App;
