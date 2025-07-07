import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

interface Phase {
  name_phase: string;
  status: string;
}

interface ProjectPhasesProps {
  projectCode: string;
  showBackButton?: boolean;
  linkToDetails?: boolean;
}

const FIXED_PHASES: Phase[] = [
  { name_phase: "Documental", status: "Pendiente" },
  { name_phase: "Ingeniería", status: "Pendiente" },
  { name_phase: "Compras", status: "Pendiente" },
  { name_phase: "Instalación", status: "Pendiente" },
  { name_phase: "Incentivos Tributarios", status: "Pendiente" },
  { name_phase: "Retie", status: "Pendiente" },
  { name_phase: "Operador de Red", status: "Pendiente" },
  { name_phase: "Marketing", status: "Pendiente" },
  { name_phase: "Mantenimiento", status: "Pendiente" },
  { name_phase: "Facturación", status: "Pendiente" },
];

const ProjectPhases: React.FC<ProjectPhasesProps> = ({
  projectCode,
  showBackButton = true,
  linkToDetails = true,
}) => {
  const navigate = useNavigate();
  const [phases, setPhases] = useState<Phase[]>([]);
  const URL = `${API_URL}/projects/${projectCode}/phases`;

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await axios.get(URL);
        const fetchedPhases: Phase[] = response.data || [];

        const mergedPhases = FIXED_PHASES.map((fixedPhase) => {
          const existing = fetchedPhases.find(
            (phase) => phase.name_phase === fixedPhase.name_phase
          );
          return existing || fixedPhase;
        });

        setPhases(mergedPhases);
      } catch (error) {
        console.error("Error al obtener los detalles del proyecto", error);
        setPhases(FIXED_PHASES);
      }
    };

    fetchPhases();
  }, [projectCode]);

  return (
    <div className="container mt-4">
      <h3>Fases del Proyecto {projectCode}</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre de la Fase</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {phases.map((phase, index) => (
            <tr key={index}>
              <td>
                {linkToDetails ? (
                  <Link
                    to={`/projects/${projectCode}/phase/${phase.name_phase}`}
                    className="text-primary"
                  >
                    {phase.name_phase}
                  </Link>
                ) : (
                  phase.name_phase
                )}
              </td>
              <td>{phase.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mb-3"
        >
          ← Volver
        </button>
      )}
    </div>
  );
};

export default ProjectPhases;
