import { Key, KeyboardContainer, Line } from "./Keyboard.styles";

const keys = [
  "q,w,e,r,t,y,u,i,o,p",
  "a,s,d,f,g,h,j,k,l,ç",
  "Enter,z,x,c,v,b,n,m,Backspace",
];

interface KeyboardProps {
  setKeyboardPress: (key: string) => void;
}

function Keyboard({ setKeyboardPress }: KeyboardProps) {
  return (
    <KeyboardContainer>
      {keys.map((keyRow, keyRowIdx) => (
        <Line key={keyRowIdx}>
          {keyRow.split(",").map((key, keyIdx) => (
            <Key
              key={keyIdx}
              value={key}
              color="lightgray"
              onClick={() => setKeyboardPress(key)}
            />
          ))}
        </Line>
      ))}
    </KeyboardContainer>
  );
}

export default Keyboard;
