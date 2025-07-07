import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ProjectForm from "../components/ProjectForm";
import * as ProjectService from "../services/ProjectService";
import { toast } from "react-toastify";
import { Project } from "../types/project";
import ProjectTable from "../components/ProjectTable";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchProjects = async () => {
    try {
      const response = await ProjectService.getProjects();
      setProjects(response?.data || []);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectSubmit = async (project: Project) => {
    try {
      const payload: Project = {
        code: project.code,
        name: project.name,
        typeOfService: project.typeOfService,
        state: project.state,
        startContract: project.startContract
          ? new Date(project.startContract)
          : undefined,
        endContract: project.endContract
          ? new Date(project.endContract)
          : undefined,
      };

      const response = await ProjectService.createProject(payload);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Proyecto creado exitosamente");
        handleCloseModal();
        fetchProjects();
      }
    } catch (error: any) {
      console.error("Error al crear el proyecto:", error);

      if (typeof error.data === "string") {
        toast.error(error.data);
        return;
      }

      if (error.status === 400 || error.status === 409) {
        const message = error.data?.message;

        if (Array.isArray(message)) {
          message.forEach((msg: string) => toast.error(msg));
        } else {
          toast.error(message || "Error de validación en el proyecto.");
        }
      } else {
        toast.error("Error inesperado al crear el proyecto.");
      }
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
          <ProjectForm onSubmit={handleProjectSubmit} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
