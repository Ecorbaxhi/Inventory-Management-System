import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Inventory,
    Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleUserMenuClose();
        logout();
        navigate('/login');
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    const navItems = [
        { label: 'Inventory', path: '/inventory', icon: <Inventory />, roles: ['chef', 'owner'] },
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, roles: ['owner'] },
    ];

    const filteredNavItems = navItems.filter(item =>
        user && item.roles.includes(user.role)
    );

    return (
        <>
            <AppBar position="sticky" color="default" elevation={1}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: isMobile ? 1 : 0,
                            fontWeight: 600,
                            color: 'primary.main',
                            mr: 4,
                        }}
                    >
                        Inventory Manager
                    </Typography>

                    {!isMobile && (
                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                            {filteredNavItems.map((item) => (
                                <Button
                                    key={item.path}
                                    startIcon={item.icon}
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{
                                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                                        fontWeight: location.pathname === item.path ? 600 : 400,
                                        borderBottom: location.pathname === item.path ? 2 : 0,
                                        borderColor: 'primary.main',
                                        borderRadius: 0,
                                        px: 2,
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {user && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {user.name}
                            </Typography>
                            <IconButton
                                onClick={handleUserMenuOpen}
                                color="inherit"
                                aria-label="user menu"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    )}

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleUserMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem disabled>
                            <Typography variant="body2" color="text.secondary">
                                {user?.email}
                            </Typography>
                        </MenuItem>
                        <MenuItem disabled>
                            <Typography variant="body2" color="text.secondary">
                                Role: {user?.role}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            >
                <Box sx={{ width: 250, pt: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{ px: 2, mb: 2, fontWeight: 600, color: 'primary.main' }}
                    >
                        Inventory Manager
                    </Typography>
                    <List>
                        {filteredNavItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    selected={location.pathname === item.path}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                        {item.icon}
                                    </Box>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
