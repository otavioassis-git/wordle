import { useEffect, useState } from "react";
import { BoardContainer, Footer } from "./Board.styles";
import Line from "../Line/Line";
import { GameOver } from "../../App";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import Keyboard from "../Keyboard/Keyboard";

interface BoardProps {
  words: string[];
  allWords: string[];
}

export interface Guess {
  word: string;
  colors: string[];
}

function Board({ words, allWords }: BoardProps) {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<GameOver>({
    isOver: false,
    win: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [keyboardPress, setKeyboardPress] = useState("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);

  useEffect(() => {
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
  }, [words]);

  useEffect(() => {
    if (guesses.length === 0) {
      for (let i = 0; i < 6; i++) {
        setGuesses((oldGuesses) => [
          ...oldGuesses,
          { word: "", colors: Array(5).fill("white") },
        ]);
      }
    }

    if (keyboardPress) {
      setKeyboardPress((oldKey) => {
        handleType(oldKey);
        return "";
      });
    }

    function handleType(key: string) {
      if (gameOver.isOver) return;
      if (key === "Backspace") {
        setCurrentGuess((oldGuess) => oldGuess.slice(0, -1));
      } else if (key === "Enter" && currentGuess.length === 5) {
        if (![...allWords, ...words].includes(currentGuess)) {
          setOpenSnackbar(true);
        } else {
          const currentGuessIndex = guesses.findIndex((guess) => !guess.word);
          guesses.map((guess, guessIdx) => {
            if (guessIdx === currentGuessIndex) {
              guess.word = currentGuess;
              guess = colorLetters(guess);
            }
          });
          setGuesses(guesses);
          setCurrentGuess("");
          checkGameOver(guesses);
        }
      } else if (currentGuess.length === 5 || key === "Enter") {
        return;
      } else {
        setCurrentGuess((oldGuess) => (oldGuess += key));
      }
    }

    function handleTypeEvent(event: KeyboardEvent) {
      handleType(event.key);
    }

    window.addEventListener("keyup", handleTypeEvent);

    return () => window.removeEventListener("keyup", handleTypeEvent);
  }, [guesses, currentGuess, keyboardPress]);

  function colorLetters(guess: Guess): Guess {
    let aux = targetWord.toString();
    for (let i = 0; i < guess.word.length; i++) {
      if (targetWord[i] === guess.word[i]) {
        setCorrectLetters((oldCorrectLetters) => [
          ...oldCorrectLetters,
          guess.word[i],
        ]);
        guess.colors[i] = "green";
        aux = aux.substring(0, i) + " " + aux.substring(i + 1);
      } else {
        guess.colors[i] = "lightgray";
      }
    }
    for (let i = 0; i < guess.word.length; i++) {
      if (aux.includes(guess.word[i]) && aux[i] != " ") {
        guess.colors[i] = "orange";
      } else if (
        guess.colors[i] !== "green" &&
        !correctLetters.includes(guess.word[i])
      ) {
        setWrongLetters((oldWrongLetters) => [
          ...oldWrongLetters,
          guess.word[i],
        ]);
      }
    }
    return guess;
  }

  function checkGameOver(guesses: Guess[]) {
    const nextGuessIndex = guesses.findIndex((guess) => !guess.word);
    if (nextGuessIndex < 0) {
      setGameOver({
        isOver: true,
        win: guesses[guesses.length - 1].colors.every(
          (color) =>
            guesses[guesses.length - 1].colors[0] == color && color == "green"
        ),
      });
    } else {
      const win = guesses[nextGuessIndex - 1].colors.every(
        (color) =>
          guesses[nextGuessIndex - 1].colors[0] == color && color == "green"
      );
      setGameOver({
        isOver: win,
        win,
      });
    }
  }

  function handleRestart() {
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setCurrentGuess("");
    let newGuesses: Guess[] = [];
    for (let i = 0; i < 6; i++) {
      newGuesses = [
        ...newGuesses,
        { word: "", colors: Array(5).fill("white") },
      ];
    }
    setGuesses(newGuesses);
    setGameOver({
      isOver: false,
      win: false,
    });
    setWrongLetters([]);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Invalid word
        </Alert>
      </Snackbar>
      <BoardContainer>
        {guesses.map((guess, guessIdx) => {
          if (guesses.findIndex((guess) => !guess.word) == guessIdx) {
            return (
              <Line key={guessIdx} guess={{ word: currentGuess, colors: [] }} />
            );
          }
          return <Line key={guessIdx} guess={guess} />;
        })}
      </BoardContainer>
      {!gameOver.isOver && (
        <Keyboard
          wrongLetters={wrongLetters}
          setKeyboardPress={setKeyboardPress}
        />
      )}
      {gameOver.isOver && (
        <Footer>
          {!gameOver.win && <Typography variant="h5">{targetWord}</Typography>}
          <Button variant="contained" size="large" onClick={handleRestart}>
            Restart
          </Button>
        </Footer>
      )}
    </>
  );
}

export default Board;
