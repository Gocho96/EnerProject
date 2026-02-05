import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProjectPhases from "./pages/PhasesPage";
import PhaseDetail from "./pages/PhaseDetail";
import ProjectDetailsView from "./components/projectDetails/ProjectDetailsView";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:code" element={<ProjectPhases/>} />
        <Route path="/project/:code/:phaseKey" element={<PhaseDetail/>} />
        <Route path="/project/:code/details" element={<ProjectDetailsView />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
