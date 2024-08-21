import styled from "@emotion/styled";
import { Box, BoxProps, Typography } from "@mui/material";

export const LineContainer = styled((props: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      gap: 1,
    }}
    {...props}
  />
))``;

export const Letter = styled(({ value, color }: { value: string, color: string }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50px",
      width: "50px",
      border: "1px solid",
      borderRadius: 2,
      bgcolor: color
    }}
  >
    <Typography variant="h6" textTransform="capitalize">
      {value}
    </Typography>
  </Box>
))``;
