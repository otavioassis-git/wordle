import { useEffect, useState } from "react";
import { BoardContainer, Footer } from "./Board.styles";
import Line from "../Line/Line";
import { GameOver } from "../../App";
import { Button, Typography } from "@mui/material";

interface BoardProps {
  words: string[];
}

export interface Guess {
  word: string;
  colors: string[];
}

function Board({ words }: BoardProps) {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<GameOver>({
    isOver: false,
    win: false,
  });

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

    function handleType(event: KeyboardEvent) {
      const key = event.key;

      if (key === "Backspace") {
        setCurrentGuess((oldGuess) => oldGuess.slice(0, -1));
      } else if (key === "Enter" && currentGuess.length === 5) {
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
      } else if (currentGuess.length === 5 || key === "Enter") {
        return;
      } else {
        setCurrentGuess((oldGuess) => (oldGuess += key));
      }
    }

    window.addEventListener("keyup", handleType);

    return () => window.removeEventListener("keyup", handleType);
  }, [guesses, currentGuess]);

  function colorLetters(guess: Guess): Guess {
    let aux = targetWord.toString();
    for (let i = 0; i < guess.word.length; i++) {
      if (targetWord[i] === guess.word[i]) {
        guess.colors[i] = "green";
        aux = aux.substring(0, i) + " " + aux.substring(i + 1);
      } else {
        guess.colors[i] = "lightgray";
      }
    }
    for (let i = 0; i < guess.word.length; i++) {
      if (aux.includes(guess.word[i]) && aux[i] != " ") {
        guess.colors[i] = "orange";
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
  }

  return (
    <>
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
      <Footer>
        {gameOver.isOver && (
          <>
            {!gameOver.win && (
              <Typography variant="h5">{targetWord}</Typography>
            )}
            <Button variant="contained" size="large" onClick={handleRestart}>
              Restart
            </Button>
          </>
        )}
      </Footer>
    </>
  );
}

export default Board;
