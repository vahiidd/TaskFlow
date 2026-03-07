import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import api from '../api/client'

type RegisterForm = {
    email: string
    fullName: string
    password: string
    passwordConfirm: string
}

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<RegisterForm>({
        defaultValues: { email: '', fullName: '', password: '', passwordConfirm: '' },
    })

    const [serverError, setServerError] = useState<string | null>(null)
    const [showPwd, setShowPwd] = useState(false)
    const [showPwd2, setShowPwd2] = useState(false)

    const onSubmit = async (data: RegisterForm) => {
        setServerError(null)
        try {
            await api.post('/auth/register', {
                email: data.email.trim(),
                fullName: data.fullName.trim(),
                password: data.password,
            })

            // Nach erfolgreicher Registrierung zum Login
            window.location.href = '/login'
        } catch (err: any) {
            // Versuche, eine sprechende Fehlermeldung auszugeben
            const message =
                err?.response?.data?.message ??
                (typeof err?.response?.data === 'string' ? err.response.data : null) ??
                'Registrierung fehlgeschlagen'
            setServerError(message)
        }
    }

    const password = watch('password')

    return (
        <Box sx={{ maxWidth: 420, mx: 'auto', mt: 8, px: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h4" fontWeight={700}>Konto erstellen</Typography>
                <Typography variant="body2" color="text.secondary">
                    Bereits einen Account?{' '}
                    <Link href="/login" underline="hover">Zum Login</Link>
                </Typography>

                {serverError && <Alert severity="error">{serverError}</Alert>}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                        <TextField
                            label="E‑Mail"
                            type="email"
                            fullWidth
                            autoComplete="email"
                            {...register('email', {
                                required: 'E‑Mail ist erforderlich',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Bitte eine gültige E‑Mail eingeben',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Voller Name"
                            fullWidth
                            autoComplete="name"
                            {...register('fullName', {
                                required: 'Name ist erforderlich',
                                minLength: { value: 2, message: 'Mindestens 2 Zeichen' },
                            })}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />

                        <TextField
                            label="Passwort"
                            type={showPwd ? 'text' : 'password'}
                            fullWidth
                            autoComplete="new-password"
                            {...register('password', {
                                required: 'Passwort ist erforderlich',
                                minLength: { value: 8, message: 'Mindestens 8 Zeichen' },
                                validate: (v) =>
                                    /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v)
                                        ? true
                                        : 'Mind. 1 Groß-, 1 Kleinbuchstabe und 1 Zahl',
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message ?? 'Mind. 8 Zeichen, inkl. Zahl & Großbuchstabe'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPwd((s) => !s)} edge="end" aria-label="Passwort anzeigen">
                                            {showPwd ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Passwort bestätigen"
                            type={showPwd2 ? 'text' : 'password'}
                            fullWidth
                            autoComplete="new-password"
                            {...register('passwordConfirm', {
                                required: 'Bitte Passwort bestätigen',
                                validate: (v) => v === password || 'Passwörter stimmen nicht überein',
                            })}
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPwd2((s) => !s)} edge="end" aria-label="Passwort anzeigen">
                                            {showPwd2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Wird erstellt…' : 'Registrieren'}
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    )
}