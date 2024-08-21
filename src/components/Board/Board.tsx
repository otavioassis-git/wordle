import { useEffect, useState } from "react";
import { BoardContainer } from "./Board.styles";
import Line from "../Line/Line";

interface BoardProps {
  target: string;
}

export interface Guess {
  word: string;
  colors: string[];
}

function Board({ target }: BoardProps) {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");

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
    let aux = target.toString();
    for (let i = 0; i < guess.word.length; i++) {
      if (target[i] === guess.word[i]) {
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

  return (
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
  );
}

export default Board;
