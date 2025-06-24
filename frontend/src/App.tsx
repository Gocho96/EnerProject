import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import PhaseDetail from "./pages/PhaseDetail";
import "./styles/App.css";


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proyectos/:code" element={<ProjectDetail />} />
        <Route path="/proyectos/:code/fases/:phase" element={<PhaseDetail />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
