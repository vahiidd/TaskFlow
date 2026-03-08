export function isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !!token
}

export function logout(): void {
    localStorage.removeItem('token')
}