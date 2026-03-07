import { useEffect, useState } from 'react'
import api from '../api/client'

type Task = {
    id: number
    title: string
    description?: string
    status: number
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        api.get('/tasks').then(res => setTasks(res.data))
    }, [])

    return (
        <div style={{ maxWidth: 720, margin: '2rem auto' }}>
            <h2>Meine Tasks</h2>
            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        <strong>{t.title}</strong>{t.description ? ` – ${t.description}` : ''}
                    </li>
                ))}
            </ul>
        </div>
    )
}