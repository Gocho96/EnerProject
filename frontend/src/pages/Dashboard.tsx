import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ProjectForm from "../components/forms/ProjectForm";
import * as ProjectService from "../services/ProjectService";
import { toast } from "react-toastify";
import { Project } from "../types/project";
import ProjectTable from "../components/tables/ProjectTable";
import { useNavigate } from "react-router-dom";
import { createDocumentPhase } from "../services/DocumentService";
import { createEngineering } from "../services/EngineeringService";
import { createShopping } from "../services/ShoppingService";
import { createInstallation } from "../services/InstallationService";
import { createTaxIncentive } from "../services/TaxIncentiveService";
import { createRetie } from "../services/RetieService";
import { createNetworkOperator } from "../services/NetworkOperadorService";
import { createMarketing } from "../services/MarketingService";
import { createMaintenanceDocument } from "../services/MaintenanceService";
import { createBilling } from "../services/BillingService";
import { createProjectDetails } from "../services/ProjectDetailsService";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchProjects = async () => {
    try {
      const response = await ProjectService.getProjects();
      setProjects(response || []);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectSubmit = async (project: Project) => {
    setLoading(true);

    try {
      const newProject = await ProjectService.createProject(project);

      await Promise.all([
        createDocumentPhase({ projectId: newProject._id }),
        createEngineering({ projectId: newProject._id }),
        createShopping({ projectId: newProject._id }),
        createInstallation({ projectId: newProject._id }),
        createTaxIncentive({ projectId: newProject._id }),
        createRetie({ projectId: newProject._id }),
        createNetworkOperator({ projectId: newProject._id }),
        createMarketing({ projectId: newProject._id }),
        createMaintenanceDocument({ projectId: newProject._id }),
        createBilling({ projectId: newProject._id }),
        createProjectDetails({
          projectId: newProject._id,
          projectOwner: "",
          typeDocument: undefined,
          documentNumber: "",
          address: "",
          location: "",
          city: "",
          department: "",
          contactPerson: [],
          solarPanels: [],
          inverters: [],
          batteries: [],
        }),
      ]);

      toast.success("Proyecto creado correctamente.");
      handleCloseModal();
      fetchProjects();
      navigate(`/project/${newProject.code}`);
    } catch (error: any) {
      console.error("Error al crear el proyecto", error);

      const errorMessage =
        error?.data?.message || error?.response?.data?.message ||
        "Error al crear el proyecto.";

      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ProjectTable projects={projects} />
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Nuevo Proyecto
      </button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ProjectForm onSubmit={handleProjectSubmit} loading={loading} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;