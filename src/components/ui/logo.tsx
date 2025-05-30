import { Typography, Box } from '@mui/material';

type MHLogoProps = {
  variant?: 'light' | 'dark'; // 'light' = use white text; 'dark' = use blue text
};

const MHLogo = ({ variant = 'dark' }: MHLogoProps) => {
  const isLight = variant === 'light';

  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ fontFamily: 'cursive', color: isLight ? '#fff' : '#000' }}
    >
      MH-
      <Box
        component="span"
        sx={{ color: isLight ? '#fff' : '#1976d2' }}
      >
        ELP
      </Box>
    </Typography>
  );
};

export default MHLogo;
