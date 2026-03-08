import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export default function Home() {
  const auth = isAuthenticated()

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 6, md: 10 },
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.02) 100%)',
          borderRadius: 2,
        }}
      >
        <Stack spacing={2} alignItems="center" sx={{ px: 2 }}>
          <Typography variant="h2" component="h1" fontWeight={900} sx={{ fontSize: { xs: 34, md: 48 } }}>
            Willkommen bei TaskFlow
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 760 }}
          >
            Behalte den Überblick über deine Aufgaben – sicher, schnell und modern mit
            {' '}<strong>ASP.NET Core</strong> & <strong>React</strong>.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
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
          </Stack>
        </Stack>
      </Box>

      {/* Value Props */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ mt: 6, alignItems: 'stretch' }}
      >
        <Box sx={{ flex: 1, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={800}>Schnell produktiv</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Einfache Bedienung, klare Struktur und ein modernes UI – so macht Task‑Management Spaß.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={800}>Sicher & skalierbar</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            JWT‑Auth, sichere Passwörter (BCrypt) und eine robuste ASP.NET Core API.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={800}>State‑of‑the‑Art Stack</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            .NET 8, SQL Server, React + Vite – moderne Tools für eine starke Developer‑Experience.
          </Typography>
        </Box>
      </Stack>

      {/* Footer Note */}
      <Box sx={{ mt: 6, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">
          Tech Stack: ASP.NET Core 8 • SQL Server • React + Vite • JWT
        </Typography>
      </Box>
    </>
  )
}
