import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

export const MainWindow = styled((props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100dvh",
      width: "100dvw",
    }}
    {...props}
  />
))``;
