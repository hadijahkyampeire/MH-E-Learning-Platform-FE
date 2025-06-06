import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Switch,
  Typography,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNotification } from '../../context/NotificationProvider';

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
  const { showNotification } = useNotification();

  const handleShowNot = () => showNotification('Test', 'success');

  return (
    <Box
      width="250px"
      p={1}
      height="100%"
      sx={{
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <List>
        {[
          { key: 'welcome', label: 'Welcome' },
          { key: 'reset', label: 'Reset Password' },
        ].map(({ key, label }) => (
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
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx={1}
      >
        <Typography variant="body2">Dark Mode</Typography>
        <Switch checked={darkMode} onChange={onToggleTheme} />
      </Box>
      <Button onClick={handleShowNot}>Test Toast</Button>
    </Box>
  );
};

export default LandingSidebar;
