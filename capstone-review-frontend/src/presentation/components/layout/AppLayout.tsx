import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  EventNote as EventNoteIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  EventAvailable as EventAvailableIcon,
  HowToReg as HowToRegIcon,
  RateReview as RateReviewIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_COLLAPSED = 72;

interface MenuItemData {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const MANAGER_MENU: MenuItemData[] = [
  { label: 'Tổng quan', icon: <DashboardIcon />, path: ROUTES.MANAGER_DASHBOARD },
  { label: 'Chiến dịch', icon: <CampaignIcon />, path: ROUTES.MANAGER_CAMPAIGNS },
  { label: 'Slot đánh giá', icon: <EventNoteIcon />, path: ROUTES.MANAGER_SLOTS },
  { label: 'Giảng viên', icon: <PeopleIcon />, path: ROUTES.MANAGER_LECTURERS },
  { label: 'Phân công', icon: <AssignmentIcon />, path: ROUTES.MANAGER_ASSIGNMENTS },
];

const LECTURER_MENU: MenuItemData[] = [
  { label: 'Tổng quan', icon: <DashboardIcon />, path: ROUTES.LECTURER_DASHBOARD },
  { label: 'Đăng ký thời gian', icon: <EventAvailableIcon />, path: ROUTES.LECTURER_AVAILABILITY },
  { label: 'Lịch phản biện', icon: <RateReviewIcon />, path: ROUTES.LECTURER_MY_REVIEWS },
];

const STUDENT_MENU: MenuItemData[] = [
  { label: 'Tổng quan', icon: <DashboardIcon />, path: ROUTES.STUDENT_DASHBOARD },
  { label: 'Đăng ký slot', icon: <HowToRegIcon />, path: ROUTES.STUDENT_REGISTRATION },
  { label: 'Phân công', icon: <AssignmentIcon />, path: ROUTES.STUDENT_MY_ASSIGNMENTS },
];

const ROLE_LABELS: Record<string, string> = {
  Manager: 'Quản trị',
  Lecturer: 'Giảng viên',
  Student: 'Sinh viên',
};

const ROLE_COLORS: Record<string, 'primary' | 'secondary' | 'success'> = {
  Manager: 'primary',
  Lecturer: 'secondary',
  Student: 'success',
};

export function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems =
    user?.role === 'Manager'
      ? MANAGER_MENU
      : user?.role === 'Lecturer'
      ? LECTURER_MENU
      : STUDENT_MENU;

  const drawerWidth = collapsed && !isMobile ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    setAnchorEl(null);
  };

  const isActive = (path: string) => {
    const parts = path.split('/').slice(0, 4).join('/');
    return location.pathname === path || location.pathname.startsWith(parts + '/');
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed && !isMobile ? 'center' : 'space-between',
          px: collapsed && !isMobile ? 0 : 2,
        }}
      >
        {!collapsed && (
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: 'primary.main' }}
            noWrap
          >
            Capstone Review
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
            {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ px: 1, mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 2,
                minHeight: 44,
                justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                px: collapsed && !isMobile ? 1 : 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed && !isMobile ? 0 : 40,
                  color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() =>
              isMobile ? setMobileOpen(!mobileOpen) : setCollapsed(!collapsed)
            }
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
              {user?.fullName?.charAt(0)?.toUpperCase() ?? 'U'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                {user?.fullName ?? 'User'}
              </Typography>
              <Chip
                label={ROLE_LABELS[user?.role ?? ''] ?? user?.role}
                color={ROLE_COLORS[user?.role ?? ''] ?? 'default'}
                size="small"
              />
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>
              <Typography variant="body2">{user?.email}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
