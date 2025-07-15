import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectDetails } from "../../types/projectDetails";
import { getProjectDetailsByProjectCode } from "../../services/ProjectDetailsService";
import GeneralInfoView from "./GeneralInfoView";
import ContactPersonView from "./ContactPersonView";
import SolarPanelView from "./SolarPanelView";
import InverterView from "./InverterView";
import BatteryView from "./BatteryView";

const ProjectDetailsView: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!code) return;
        const data = await getProjectDetailsByProjectCode(code);
        setDetails(data);
      } catch (error: any) {
        console.error("Error al obtener detalles del proyecto:", error);
        toast.error(
          error.response?.data?.message ||
            "Error al obtener detalles del proyecto"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [code]);

  const handleUpdate = (updated: Partial<ProjectDetails>) => {
    if (!details) return;
    setDetails({ ...details, ...updated });
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!details)
    return (
      <div className="container mt-4">
        <p>
          No se encontraron detalles del proyecto con código <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Detalles del Proyecto - {code}</h3>

      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            Información General
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            Contactos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "panels" ? "active" : ""}`}
            onClick={() => setActiveTab("panels")}
          >
            Paneles Solares
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "inverters" ? "active" : ""}`}
            onClick={() => setActiveTab("inverters")}
          >
            Inversores
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "batteries" ? "active" : ""}`}
            onClick={() => setActiveTab("batteries")}
          >
            Baterías
          </button>
        </li>
      </ul>

      <div className="p-3 border border-top-0">
        {activeTab === "general" && (
          <GeneralInfoView details={details} onUpdate={handleUpdate} />
        )}
        {activeTab === "contacts" && (
          <ContactPersonView
            projectId={details.projectId}
            contacts={details.contactPerson}
            onUpdate={handleUpdate}
          />
        )}
        {activeTab === "panels" && (
          <SolarPanelView
            projectId={details.projectId}
            panels={details.solarPanels}
            onUpdate={handleUpdate}
          />
        )}
        {activeTab === "inverters" && (
          <InverterView
            projectId={details.projectId}
            inverters={details.inverters}
            onUpdate={handleUpdate}
          />
        )}
        {activeTab === "batteries" && (
          <BatteryView
            projectId={details.projectId}
            batteries={details.batteries}
            onUpdate={handleUpdate}
          />
        )}
      </div>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default ProjectDetailsView;
