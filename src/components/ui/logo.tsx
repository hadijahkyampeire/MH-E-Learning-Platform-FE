import { Typography, Box, useTheme } from '@mui/material';

const MHLogo = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{
        fontFamily: 'cursive',
        color: isDark ? '#fff' : '#800000',
        pointerEvents: 'none',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      MH-
      <Box
        component="span"
        sx={{
          color: isDark ? '#fff' : '#1976d2',
          pointerEvents: 'none',
        }}
      >
        ELP
      </Box>
    </Typography>
  );
};

export default MHLogo;
