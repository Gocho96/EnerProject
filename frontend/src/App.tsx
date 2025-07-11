import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProjectPhases from "./pages/PhasesPage";
import PhaseDetail from "./pages/PhaseDetail";
import "./styles/App.css";


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" />
        <Route path="/project/:code" element={<ProjectPhases/>} />
        <Route path="/project/:code/phase/:phaseKey" element={<PhaseDetail/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
