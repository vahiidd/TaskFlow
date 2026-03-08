import { useState } from 'react'
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom'
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material'
import api from '../api/client'

export default function Login() {
    const nav = useNavigate()
    const location = useLocation() as any
    const redirectTo = location?.state?.from?.pathname || '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [remember, setRemember] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await api.post('/auth/login', { email: email.trim(), password })
            // Token speichern
            if (remember) {
                localStorage.setItem('token', res.data.token)
            } else {
                sessionStorage.setItem('token', res.data.token)
            }
            // Weiterleiten (woher man kam oder Home)
            nav(redirectTo, { replace: true })
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ??
                (typeof err?.response?.data === 'string' ? err.response.data : null) ??
                'Login fehlgeschlagen'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '70vh', px: 2 }}>
            <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    p: { xs: 3, sm: 4 },
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    boxShadow: { sm: 1 },
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h4" fontWeight={800} textAlign="center">
                        Anmelden
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        Willkommen zurück bei <strong>TaskFlow</strong>
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="E‑Mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        fullWidth
                    />

                    <TextField
                        label="Passwort"
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Passwort anzeigen"
                                        onClick={() => setShowPwd((s) => !s)}
                                        edge="end"
                                    >
                                        {showPwd ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    size="small"
                                />
                            }
                            label="Angemeldet bleiben"
                        />
                    </Stack>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<LoginIcon />}
                        disabled={loading}
                    >
                        {loading ? 'Wird angemeldet…' : 'Einloggen'}
                    </Button>

                    <Typography variant="body2" textAlign="center" color="text.secondary">
                        Neu hier?{' '}
                        <Link component={RouterLink} to="/register" underline="hover">
                            Konto erstellen
                        </Link>
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}