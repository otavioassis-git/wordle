import styled from "@emotion/styled";
import { Box, BoxProps, Typography } from "@mui/material";
import backspaceIcon from "../../assets/backspace.svg";
import enterIcon from "../../assets/enter.svg";

export const KeyboardContainer = styled((props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    }}
    {...props}
  />
))``;

interface LineProps extends BoxProps {
  idx: number;
}

export const Line = styled((props: LineProps) => (
  <Box
    sx={{ display: "flex", gap: 1, ml: props.idx === 2 ? 1 : 0 }}
    {...props}
  />
))``;

export const Key = styled(
  ({
    value,
    color,
    onClick,
  }: {
    value: string;
    color: string;
    onClick: () => void;
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        width: "30px",
        border: "1px solid",
        borderRadius: 2,
        bgcolor: color,
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={onClick}
    >
      <Typography
        variant="h6"
        textTransform="capitalize"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {["Enter", "Backspace"].includes(value) ? (
          <ImageKey src={value === "Enter" ? enterIcon : backspaceIcon} />
        ) : (
          value
        )}
      </Typography>
    </Box>
  )
)``;

const ImageKey = styled.img`
  width: calc(100% - 4px);
`;
