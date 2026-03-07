# TaskFlow – Fullstack Productivity App (ASP.NET Core 8 + SQL Server + React)

TaskFlow ist eine moderne Fullstack‑Webanwendung zur Verwaltung persönlicher Aufgaben (Tasks). Das Projekt demonstriert professionelle Software‑Engineering‑Skills mit Fokus auf:

- ASP.NET Core 8 Web API
- SQL Server + Entity Framework Core 8
- JWT Authentication & Authorization
- Secure Password Hashing (BCrypt)
- Swagger API Dokumentation

## 🚀 Tech Stack

### Backend
- C# / ASP.NET Core 8
- Entity Framework Core 8
- SQL Server
- JWT Authentication
- BCrypt.Net
- Swagger / Swashbuckle

## 📌 Features
- Benutzerregistrierung & Login
- Sichere Passwortspeicherung
- JWT‑basierte Authentifizierung
- CRUD für Tasks
- Geschützte Endpoints
- SQL Server Datenbank
- Saubere Architektur (Entities, DTOs, Services, Controllers)

## ⚙️ Installation

### Voraussetzungen
- .NET 8 SDK
- SQL Server (LocalDB oder Developer)

### Setup
```bash
dotnet user-secrets init
dotnet user-secrets set "Jwt:Key" "<Langer_32+_Byte_Key>"
```
```bash
Add-Migration InitialCreate
Update-Database
```

## 📘 Swagger
Nach dem Start verfügbar unter:
```
https://localhost:<port>/swagger
```

## 🧪 Beispiel Requests
### Register
```json
{
  "email": "test@test.com",
  "fullName": "Test User",
  "password": "Passw0rd!"
}
```

### Login
```json
{
  "email": "test@test.com",
  "password": "Passw0rd!"
}
```

## 📄 Lizenz
MIT License
