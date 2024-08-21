import { Key, KeyboardContainer, Line } from "./Keyboard.styles";

const keys = [
  "q,w,e,r,t,y,u,i,o,p",
  "a,s,d,f,g,h,j,k,l,ç",
  "Enter,z,x,c,v,b,n,m,Backspace",
];

interface KeyboardProps {
  wrongLetters: string[]
  setKeyboardPress: (key: string) => void;
}

function Keyboard({ wrongLetters, setKeyboardPress }: KeyboardProps) {
  return (
    <KeyboardContainer>
      {keys.map((keyRow, keyRowIdx) => (
        <Line idx={keyRowIdx} key={keyRowIdx}>
          {keyRow.split(",").map((key, keyIdx) => (
            <Key
              key={keyIdx}
              value={key}
              color={wrongLetters.includes(key) ? 'gray' : 'lightgray'}
              onClick={() => setKeyboardPress(key)}
            />
          ))}
        </Line>
      ))}
    </KeyboardContainer>
  );
}

export default Keyboard;
