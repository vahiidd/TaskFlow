import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Register from './pages/Register'

const router = createBrowserRouter([
    { path: '/', element: <Tasks /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)