import { useState } from "react";
import { BoardContainer, Letter, Line } from "./Board.styles";

interface BoardProps {
  target: string;
}

function Board({ target }: BoardProps) {
  const [attempts, setAttempts] = useState<string[]>(Array(6).fill("teste"));

  return (
    <BoardContainer>
      {attempts.map((attempt, attemptIdx) => (
        <Line key={attemptIdx}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Letter value={attempt[index]} />
            ))}
        </Line>
      ))}
    </BoardContainer>
  );
}

export default Board;
