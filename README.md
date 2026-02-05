# EnerProject

Plataforma integral de gestión de proyectos energéticos

## 📋 Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🚀 Inicio rápido

\`\`\`bash
# Instalar dependencias
npm run install:all

# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
\`\`\`

## 📁 Estructura del proyecto

\`\`\`
packages/
├── shared/     # Tipos y esquemas compartidos
├── backend/    # API Express + MongoDB
└── frontend/   # React + Vite
\`\`\`

## 🔧 Scripts disponibles

| Script | Descripción |
|--------|------------|
| \`dev\` | Inicia backend + frontend |
| \`build\` | Compila todo |
| \`lint\` | Valida código |
| \`type-check\` | Verifica tipos |

## 📝 Licencia

ISC
\`\`\`

### 8️⃣ **Archivo .env en cada package**

Backend `.env.local`:
````bash
// filepath: c:\EnerProject\packages\backend\.env.local
MONGO_URI=mongodb://localhost:27017/enerproject
JWT_SECRET=tu_secret_jwt_aqui
PORT=3000
NODE_ENV=development