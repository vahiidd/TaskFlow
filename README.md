# 🧩 TaskFlow – Fullstack Productivity App  
**ASP.NET Core 8 + SQL Server + React (Vite + TypeScript)**

TaskFlow ist eine moderne Fullstack‑Webanwendung zur Verwaltung persönlicher Aufgaben (Tasks).  
Das Projekt demonstriert professionelle Entwicklung über den gesamten Stack:

- 🟦 **ASP.NET Core 8 Web API**
- 🗄️ **SQL Server (LocalDB / Azure SQL) + EF Core 8 (Code‑First)**
- 🔐 **JWT Authentication** & **BCrypt** Passwort‑Hashing
- ⚛️ **React + TypeScript + Vite** (mit Proxy im Dev)
- 🎨 **Material UI** (optional)
- 📘 **Swagger** API‑Dokumentation

---

## 📁 Projektstruktur

```
TaskFlow/
 ├─ TaskFlowApi/                 # Backend (.NET 8 Web API)
 ├─ taskflow-frontend/           # Frontend (React + Vite + TS)
 ├─ README.md
 └─ LICENSE or LICENSE.txt
```

---

## 🚀 Features

### 🔐 Benutzer & Authentifizierung
- Registrierung & Login
- Sichere Passwörter (BCrypt)
- JWT mit Claims (NameIdentifier, Email)
- Geschützte API‑Routen via `[Authorize]`

### 📋 Task Management
- CRUD: anlegen, lesen, bearbeiten, löschen
- Nur eigene Tasks je Benutzer
- Status (Open / InProgress / Done)
- Zeitstempel (CreatedAt / UpdatedAt)

### 💻 Frontend
- React 18 + TypeScript
- Axios‑Client mit Token‑Interceptor
- React Router
- (Optional) Material UI Komponenten

---

# 🏛 Backend – ASP.NET Core 8 + SQL Server

### 🔧 Voraussetzungen
- .NET 8 SDK
- Visual Studio 2022
- SQL Server (LocalDB oder Developer Edition)

### 1) Konfiguration
- **ConnectionString** in `TaskFlowApi/appsettings.json` (LocalDB Beispiel):
  ```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TaskFlowDb;Trusted_Connection=True;MultipleActiveResultSets=true"
    }
  }
  ```
- **JWT‑Key** sicher per **User Secrets** (aus Projektkontext ausführen):
  ```bash
  dotnet user-secrets init
  dotnet user-secrets set "Jwt:Key" "<Dein_32+_Byte_Key>"
  ```

### 2) Datenbank (EF Core)
In Visual Studio → **Package Manager Console**:
```powershell
Add-Migration InitialCreate
Update-Database
```

### 3) Starten
```bash
cd TaskFlowApi
dotnet run
```
Swagger ist erreichbar unter:
```
https://localhost:<port>/swagger
```

---

# 🖥 Frontend – React + Vite + TypeScript

### 🔧 Voraussetzungen
- Node.js LTS (>= 18)

### 1) Installation
```bash
cd taskflow-frontend
npm install
```

### 2) Dev‑Proxy zu deiner API (Vite)
In `taskflow-frontend/vite.config.ts` den **EXAKTEN** Backend‑Port/URL eintragen (aus Swagger‑Adresse):
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7013', // <— anpassen!
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
```

### 3) API‑Client (Axios)
`taskflow-frontend/src/api/client.ts`
```ts
import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
```

### 4) Starten (Dev)
```bash
npm run dev
```
Frontend ist erreichbar unter:
```
http://localhost:5173
```

> **Hinweis:** Achte darauf, Requests **ohne doppeltes `/api`** zu senden. Mit `baseURL:'/api'` rufe Endpunkte als `api.get('/tasks')` auf (nicht `'/api/tasks'`).

---

# 🔗 Verbindung Frontend ↔ Backend (Prod)

## Option 1 – Getrennt hosten (empfohlen)
- **Backend**: z. B. Render oder Azure App Service → ergibt eine URL wie
  `https://taskflow-api.onrender.com`
- **Frontend**: z. B. Vercel oder Netlify → ergibt eine URL wie
  `https://taskflow.vercel.app`
- Im Frontend eine **`.env.production`** anlegen:
  ```env
  VITE_API_BASE=https://taskflow-api.onrender.com
  ```
- API‑Client für Prod so konfigurieren, dass `baseURL` diese Variable nutzt (z. B. `baseURL: import.meta.env.VITE_API_BASE + '/api'`).

## Option 2 – Zusammen hosten (API liefert das Frontend aus)
1) Frontend bauen:
```bash
cd taskflow-frontend
npm run build
```
2) Den erzeugten Ordner `dist/` nach `TaskFlowApi/wwwroot/` kopieren (Ordner ggf. anlegen).
3) In `TaskFlowApi/Program.cs` sicherstellen:
```csharp
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html"); // SPA-Fallback
app.MapControllers(); // API bleibt unter /api
```

---

# 📘 Swagger – API testen
Wenn die API läuft, öffne:
```
https://localhost:<port>/swagger
```
Ablauf zum Testen:
1. **Register**: neuen Benutzer anlegen (`POST /api/auth/register`)
2. **Login**: Token holen (`POST /api/auth/login`)
3. **Authorize** in Swagger → `Bearer <token>` eintragen
4. **Tasks** Endpunkte testen

---

# 🧪 Beispiel‑Payloads

### `POST /api/auth/register`
```json
{
  "email": "test@test.com",
  "fullName": "Test User",
  "password": "Passw0rd!"
}
```

### `POST /api/auth/login`
```json
{
  "email": "test@test.com",
  "password": "Passw0rd!"
}
```

### `POST /api/tasks`
```json
{
  "title": "Mein erster Task",
  "description": "Beschreibung",
  "status": 0
}
```

---

# 🗺️ Roadmap
- [ ] React UI verfeinern (MUI Layout, Form Validation, Toasts)
- [ ] React Query für Caching & Mutations
- [ ] Pagination/Filtering im Backend
- [ ] Refresh Tokens
- [ ] Docker Compose (API + DB)
- [ ] CI/CD (GitHub Actions)

---

# 📄 Lizenz
MIT License – siehe **LICENSE.txt**

---

# 👤 Autor
**Vahid Kosari Yamchelou** – Fullstack Developer (.NET + React)

Wenn dir das Projekt gefällt: ⭐ **Star** setzen!
