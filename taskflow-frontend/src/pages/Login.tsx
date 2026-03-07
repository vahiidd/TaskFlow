import { useState } from 'react'
import api from '../api/client'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        try {
            const res = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            // redirect:
            window.location.href = '/'
        } catch (err: any) {
            setError(err?.response?.data ?? 'Login fehlgeschlagen')
        }
    }

    return (
        <form onSubmit={handleLogin} style={{ maxWidth: 360, margin: '3rem auto' }}>
            <h2>Login</h2>
            <input placeholder="E-Mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Passwort" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Einloggen</button>
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
        </form>
    )
}