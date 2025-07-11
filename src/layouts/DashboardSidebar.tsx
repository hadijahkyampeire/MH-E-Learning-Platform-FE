import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
  Switch,
  useTheme,
  useMediaQuery,
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
import { useThemeContext } from '../context/themeContext';

export type MenuItem = {
  label: string;
  icon?: React.ReactNode | null;
  path?: string | null;
  children?: MenuItem[];
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  type?: 'item' | 'header' | 'custom';
  customRender?: React.ReactNode;
};

type Props = {
  items: MenuItem[];
  width?: number;
  mobileOpen?: boolean;
  onDrawerToggle?: () => void;
};

const DashboardSidebar = ({
  items,
  width = 240,
  mobileOpen = false,
  onDrawerToggle,
}: Props) => {
  const { darkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = (label: string) => {
    setOpenMap((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && onDrawerToggle) {
      onDrawerToggle();
    }
  };

  const renderMenu = (menuItems: MenuItem[], level = 0) => (
    <List component="div" disablePadding sx={{ pl: level * 2 }}>
      {menuItems.map((item) => {
        if (item.type === 'custom' && item.customRender) {
          return <Box key={item.label}>{item.customRender}</Box>;
        }

        if (item.type === 'header') {
          return (
            <ListItem key={item.label} disablePadding sx={{ pl: 2 }}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.secondary',
                      mt: 2,
                      fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItem>
          );
        }
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMap[item.label];
        const isSelected = !!item.path && location.pathname === item.path;

        return (
          <div key={item.label}>
            <ListItemButton
              onClick={() =>
                hasChildren
                  ? handleToggle(item.label)
                  : item.path && handleNavigation(item.path)
              }
              selected={isSelected}
              disabled={!item.path && !hasChildren}
              aria-expanded={hasChildren ? isOpen : undefined}
              aria-label={item.label}
              role="menuitem"
              sx={{
                color: theme.palette.text.primary,
                minHeight: isSmallScreen ? '48px' : '56px',
                '&.Mui-selected': {
                  backgroundColor: theme.palette?.custom?.activeMenu,
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: isSmallScreen ? '36px' : '40px',
                }}
              >
                {item.icon || <DashboardIcon />}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: isSmallScreen ? '0.875rem' : '1rem',
                  },
                }}
              />
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

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: 0 }}>
        {renderMenu(items)}
      </Box>

      <Box sx={{ flexShrink: 0, p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            {darkMode ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
              }}
            >
              Appearance
            </Typography>
          </Box>

          <Switch
            size="small"
            checked={darkMode}
            onChange={toggleTheme}
            color="secondary"
            aria-label="Toggle dark mode"
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? '280px' : '320px',
            top: '64px',
            height: 'calc(100vh - 64px)',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            display: 'flex',
            flexDirection: 'column',
            borderRight: `1px solid ${theme.palette.divider}`,
            borderRadius: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: isMobile ? '200px' : width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '200px' : width,
            top: '64px',
            height: 'calc(100vh - 64px)',
            position: 'fixed',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            display: 'flex',
            flexDirection: 'column',
            borderRight: `1px solid ${theme.palette.divider}`,
            borderRadius: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
