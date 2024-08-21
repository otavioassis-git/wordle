import { useState } from "react";
import { BoardContainer } from "./Board.styles";
import Line from "../Line/Line";

interface BoardProps {
  target: string;
}

export interface Guess {
  word: string;
  colors?: string[];
}

function Board({ target }: BoardProps) {
  const [guesses, setGuesses] = useState<Guess[]>(Array(6).fill({ word: "" }));
  const [currentGuess, setCurrentGuess] = useState<string>("");

  return (
    <BoardContainer>
      {guesses.map((guess, guessIdx) => {
        if (guesses.findIndex((guess) => !guess.word) == guessIdx) {
          return <Line key={guessIdx} guess={{ word: currentGuess }} />;
        }
        return <Line key={guessIdx} guess={guess} />;
      })}
    </BoardContainer>
  );
}

export default Board;
