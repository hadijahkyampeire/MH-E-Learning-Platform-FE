import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
  Switch,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../context/themeContext';

export type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

type Props = {
  items: MenuItem[];
  width?: number;
};

const DashboardSidebar = ({ items, width = 240 }: Props) => {
  const { darkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const handleToggle = (label: string) => {
    setOpenMap((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenu = (menuItems: MenuItem[], level = 0) => (
    <List component="div" disablePadding sx={{ pl: level * 2 }}>
      {menuItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMap[item.label];

        return (
          <div key={item.label}>
            <ListItemButton
              onClick={() =>
                hasChildren
                  ? handleToggle(item.label)
                  : item.path && navigate(item.path)
              }
              selected={!!item.path && location.pathname === item.path}
              disabled={!item.path && !hasChildren}
              sx={{
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: theme.palette?.custom?.activeMenu,
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon || <DashboardIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {hasChildren ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItemButton>
            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {renderMenu(item.children!, level + 1)}
              </Collapse>
            )}
          </div>
        );
      })}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          top: '66px',
          height: 'calc(100vh - 64px)',
          position: 'fixed',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box>{renderMenu(items)}</Box>

      <Box p={2}>
        <Divider sx={{ mb: 1 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            {darkMode ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
            <Typography variant="body2">Appearance</Typography>
          </Box>

          <Switch
            size="small"
            checked={darkMode}
            onChange={toggleTheme}
            color="secondary"
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;
