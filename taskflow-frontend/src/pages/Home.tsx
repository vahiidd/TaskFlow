import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export default function Home() {
    const auth = isAuthenticated()

    return (
        <Stack direction="column" alignItems="center" spacing={3} sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={800}>
                Willkommen bei TaskFlow
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720 }}>
                Behalte den Überblick über deine Aufgaben – sicher, schnell und modern mit ASP.NET Core + React.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {!auth ? (
                    <>
                        <Button variant="contained" size="large" component={RouterLink} to="/register">
                            Konto erstellen
                        </Button>
                        <Button variant="outlined" size="large" component={RouterLink} to="/login">
                            Ich habe schon ein Konto
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" size="large" component={RouterLink} to="/tasks">
                        Zu meinen Tasks
                    </Button>
                )}
            </Box>

            <Box sx={{ mt: 6, color: 'text.secondary' }}>
                <Typography variant="body2">Tech Stack: ASP.NET Core 8 • SQL Server • React + Vite • JWT</Typography>
            </Box>
        </Stack>
    )
}