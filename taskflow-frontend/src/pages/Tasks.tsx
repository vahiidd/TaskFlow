import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Alert,
  InputAdornment,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import api from '../api/client'

type Task = {
  id: number
  title: string
  description?: string
  status: number // 0 Open, 1 InProgress, 2 Done
  dueDate?: string | null
  createdAt?: string
  updatedAt?: string | null
}

const STATUS_LABEL: Record<number, string> = {
  0: 'Open',
  1: 'In Progress',
  2: 'Done',
}

const STATUS_COLOR: Record<number, 'default' | 'warning' | 'success'> = {
  0: 'default',
  1: 'warning',
  2: 'success',
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // UI State
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<number | 'all'>('all')

  // Dialog
  const [openDialog, setOpenDialog] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [form, setForm] = useState<{ title: string; description: string; status: number; dueDate: string | '' }>({
    title: '',
    description: '',
    status: 0,
    dueDate: '',
  })

  const loadTasks = async () => {
    try {
      setLoading(true)
      // Optional: Serverseitiges Filtern nach Status (Controller erlaubt ?status=)
      const url = statusFilter === 'all' ? '/tasks' : `/tasks?status=${statusFilter}`
      const res = await api.get(url)
      setTasks(res.data)
    } catch (e: any) {
      setError(e?.response?.data ?? 'Fehler beim Laden der Tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description ?? '').toLowerCase().includes(q)
    )
  }, [tasks, query])

  const handleOpenCreate = () => {
    setEditing(null)
    setForm({ title: '', description: '', status: 0, dueDate: '' })
    setOpenDialog(true)
  }

  const handleOpenEdit = (t: Task) => {
    setEditing(t)
    setForm({
      title: t.title,
      description: t.description ?? '',
      status: t.status,
      dueDate: t.dueDate ? t.dueDate.substring(0, 16) : '',
    })
    setOpenDialog(true)
  }

  const handleDelete = async (t: Task) => {
    if (!confirm(`Task "${t.title}" wirklich löschen?`)) return
    try {
      await api.delete(`/tasks/${t.id}`)
      setTasks(prev => prev.filter(x => x.id !== t.id))
    } catch (e: any) {
      setError(e?.response?.data ?? 'Löschen fehlgeschlagen')
    }
  }

  const handleSubmit = async () => {
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      status: form.status,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    }
    try {
      if (!payload.title) return setError('Titel darf nicht leer sein')
      if (editing) {
        const res = await api.put(`/tasks/${editing.id}`, payload)
        setTasks(prev => prev.map(x => (x.id === editing.id ? res.data : x)))
      } else {
        const res = await api.post('/tasks', payload)
        setTasks(prev => [res.data, ...prev])
      }
      setOpenDialog(false)
    } catch (e: any) {
      setError(e?.response?.data ?? 'Speichern fehlgeschlagen')
    }
  }

  return (
    <Box>
      {/* Toolbar */}
      <Toolbar disableGutters sx={{ mt: 1, mb: 2, gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="h4" fontWeight={800} sx={{ mr: 'auto' }}>
          Meine Tasks
        </Typography>

        <TextField
          placeholder="Suche (Titel/Beschreibung)…"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ minWidth: { xs: '100%', sm: 320 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />

        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          sx={{ width: { xs: '100%', sm: 180 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        >
          <MenuItem value="all">Alle</MenuItem>
          <MenuItem value={0}>Open</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Done</MenuItem>
        </TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{ ml: 'auto' }}
        >
          Neu
        </Button>
      </Toolbar>

      {/* Loading */}
      {loading && (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="70%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={48} sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 6 }}>
          <Typography variant="h6" fontWeight={700}>Keine Tasks gefunden</Typography>
          <Typography variant="body2">Passe die Suche/Filter an oder lege einen neuen Task an.</Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleOpenCreate}>Neuer Task</Button>
        </Box>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <Grid container spacing={2}>
          {filtered.map(t => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Typography variant="h6" fontWeight={700} noWrap title={t.title}>
                      {t.title}
                    </Typography>
                    <Chip
                      label={STATUS_LABEL[t.status] ?? String(t.status)}
                      color={STATUS_COLOR[t.status]}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  {t.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {t.description}
                    </Typography>
                  )}

                  {t.dueDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Fällig: {new Date(t.dueDate).toLocaleString()}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Bearbeiten">
                    <IconButton aria-label="Bearbeiten" onClick={() => handleOpenEdit(t)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Löschen">
                    <IconButton aria-label="Löschen" color="error" onClick={() => handleDelete(t)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Task bearbeiten' : 'Neuen Task anlegen'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Titel"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Beschreibung"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              minRows={3}
              multiline
              fullWidth
            />

            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
              fullWidth
            >
              <MenuItem value={0}>Open</MenuItem>
              <MenuItem value={1}>In Progress</MenuItem>
              <MenuItem value={2}>Done</MenuItem>
            </TextField>

            <TextField
              label="Fällig am"
              type="datetime-local"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Abbrechen</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editing ? 'Speichern' : 'Anlegen'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Fehler-Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
