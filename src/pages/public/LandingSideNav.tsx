import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  AutoAwesome as FeaturesIcon,
  LockReset as ResetIcon,
} from '@mui/icons-material';

type Props = {
  selected: string;
  onSelect: (value: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
};

const LandingSidebar = ({
  selected,
  onSelect,
  darkMode,
  onToggleTheme,
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        <List>
          {[
            { key: 'welcome', label: 'Welcome', icon: <HomeIcon /> },
            { key: 'features', label: 'Features', icon: <FeaturesIcon /> },
            { key: 'reset', label: 'Reset Password', icon: <ResetIcon /> },
          ].map(({ key, label, icon }) => (
            <ListItemButton
              key={key}
              selected={selected === key}
              onClick={() => onSelect(key)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ flexShrink: 0, p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mx={1}
        >
          <Typography variant="body2">Dark Mode</Typography>
          <Switch checked={darkMode} onChange={onToggleTheme} />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingSidebar;
