import React from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../types/project";

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const navigate = useNavigate();

  const handleProjectClick = (code: string) => {
    navigate(`/projects/${code}`);
  };

  return (
    <div className="container mt-4">
      <h3>Lista de Proyectos</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Tipo de Servicio</th>
            <th>Estado</th>
            <th>Inicio del Contrato</th>
            <th>Fin del Contrato</th>
            <th>Próximo mantenimiento</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                No hay proyectos disponibles.
              </td>
            </tr>
          ) : (
            projects.map((project, index) => (
              <tr
                key={project.code}
                onClick={() => handleProjectClick(project.code)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{project.code}</td>
                <td>{project.name}</td>
                <td>{project.typeOfService}</td>
                <td>{project.state}</td>
                <td>{project.startContract ? new Date(project.startContract).toLocaleDateString() : "N/A"}</td>
                <td>{project.endContract ? new Date(project.endContract).toLocaleDateString() : "N/A"}</td>
                <td>{project.nextMaintenance ? new Date(project.nextMaintenance).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
