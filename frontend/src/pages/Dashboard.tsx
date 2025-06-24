import { useState } from "react";
import { Modal } from "react-bootstrap";
import ProjectForm from "../components/ProjectForm";
import * as ProjectService from "../services/ProjectService";
import { toast } from "react-toastify";
import { Project } from "../types/project";
import ProjectTable from "../components/ProjectTable";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleProjectSubmit = async (project: Project) => {
    try {
      await ProjectService.createProject(project);
      toast.success("Proyecto creado exitosamente.");
      handleCloseModal();
    } catch (error) {
      toast.error("Error al crear el proyecto.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <ProjectTable />
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Nuevo Proyecto
      </button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProjectForm onSubmit={handleProjectSubmit} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
