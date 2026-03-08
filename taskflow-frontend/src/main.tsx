import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

// Router-Konfiguration:
// - '/' zeigt Home (Landing)
// - '/tasks' ist geschützt (via ProtectedRoute)
// - Login/Register sind offen
const router = createBrowserRouter([
    {
        element: <MainLayout />,    // Navbar + Container
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            {
                element: <ProtectedRoute />,        // alles hier unterliegt Auth
                children: [
                    { path: '/tasks', element: <Tasks /> }
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)