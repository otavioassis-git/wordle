import styled from "@emotion/styled";
import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";

export const MainWindow = styled((props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100dvh",
      width: "100dvw",
      p: 2,
    }}
    {...props}
  />
))``;

export const Title = styled((props: TypographyProps) => (
  <Typography variant="h3" fontWeight="bold" {...props} />
))``;
