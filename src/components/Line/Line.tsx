import { Guess } from "../Board/Board";
import { Letter, LineContainer } from "./Line.styles";

function Line({ guess }: { guess: Guess }) {
  return (
    <LineContainer>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Letter key={index} value={guess.word[index]} />
        ))}
    </LineContainer>
  );
}

export default Line;
