import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Project {
  code: string;
  name: string;
  type_service: string;
  state: string;
  start_contract: Date;
  end_contract: Date;
  next_maintenance: Date;
}

const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/proyectos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Proyectos recibidos:", data);
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los proyectos:", error);
        setLoading(false);
      });
  }, []);


  const handleProjectClick = (code: string) => {
    navigate(`/proyectos/${code}`);
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
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                Cargando proyectos...
              </td>
            </tr>
          ) : projects.length === 0 ? (
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
                <td>{project.type_service}</td>
                <td>{project.state}</td>
                <td>{new Date(project.start_contract).toLocaleDateString()}</td>
                <td>{new Date(project.end_contract).toLocaleDateString()}</td>
                <td>{new Date(project.next_maintenance).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
