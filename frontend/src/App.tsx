import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/PhasesPage";
import DocumentalDetail from "./components/DocumentalDetail";
import "./styles/App.css";


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" />
        <Route path="/projects/:code" element={<ProjectDetails/>} />

        <Route path="/projects/:code/phase/documental" element={<DocumentalDetail />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
