import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../utils/auth'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    const nav = useNavigate()
    const auth = isAuthenticated()

    const handleLogout = () => {
        logout()
        nav('/login')
    }

    return (
        <>
            <AppBar position="static" color="primary" elevation={1}>
                <Toolbar sx={{ gap: 2 }}>
                    <Typography variant="h6" component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', fontWeight: 700 }}>
                        TaskFlow
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {!auth ? (
                        <>
                            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                            <Button color="inherit" component={RouterLink} to="/register">Registrieren</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={RouterLink} to="/tasks">Meine Tasks</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Kind-Routen rendern hier */}
                <Outlet />
            </Container>
        </>
    )
}