import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

export const BoardContainer = styled((props: BoxProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} {...props} />
))``;

export const Footer = styled((props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      height: '92px'
    }}
    {...props}
  />
))``;