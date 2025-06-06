import React from 'react';
import { Card, Typography, Box } from '@mui/material';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon && <Box>{icon}</Box>}
      <Box>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Card>
  );
};

export default StatCard;
